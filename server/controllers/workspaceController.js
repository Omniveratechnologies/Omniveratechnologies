import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import User from "../models/User.js";
import CustomerWorkspace from "../models/CustomerWorkspace.js";

const safeUser = (u) => ({
  id: String(u._id), name: u.name || u.username || "Customer", email: u.email || "",
  username: u.username || "", role: u.role, createdAt: u.createdAt
});
const isAdmin = (req) => req.user?.role === "admin";
const ensureWorkspace = async (userId) => {
  let workspace = await CustomerWorkspace.findOne({ userId });
  if (!workspace) workspace = await CustomerWorkspace.create({ userId });
  return workspace;
};
const addActivity = (workspace, title, type = "update", detail = "") => {
  workspace.activities.unshift({ title, type, detail, createdAt: new Date() });
  workspace.activities = workspace.activities.slice(0, 100);
};

export async function myWorkspace(req, res, next) {
  try {
    const workspace = await ensureWorkspace(req.user._id);
    res.json({ success: true, user: safeUser(req.user), workspace });
  } catch (e) { next(e); }
}

export async function sendMessage(req, res, next) {
  try {
    const message = String(req.body.message || "").trim();
    if (!message || message.length > 4000) return res.status(400).json({ success: false, message: "Message must be 1–4000 characters." });
    const workspace = await ensureWorkspace(req.user._id);
    workspace.messages.push({ senderId: req.user._id, senderName: req.user.name || req.user.username || "User", senderRole: req.user.role, message });
    addActivity(workspace, `New message from ${req.user.role === "admin" ? "Omnivera" : "customer"}`, "message", message.slice(0, 160));
    await workspace.save();
    res.status(201).json({ success: true, workspace });
  } catch (e) { next(e); }
}

export async function listCustomers(req, res, next) {
  try {
    if (!isAdmin(req)) return res.status(403).json({ success: false, message: "Admin access required." });
    const users = await User.find({ role: "customer" }).select("name email username role createdAt").sort({ createdAt: -1 }).lean();
    const workspaces = await CustomerWorkspace.find({ userId: { $in: users.map(u => u._id) } }).select("userId company customerStatus projects products payments updatedAt").lean();
    const map = new Map(workspaces.map(w => [String(w.userId), w]));
    res.json({ success: true, customers: users.map(u => {
      const w = map.get(String(u._id)) || {};
      return { ...safeUser(u), company: w.company || "", customerStatus: w.customerStatus || "Active",
        projectCount: (w.projects || []).length, productCount: (w.products || []).length, paymentCount: (w.payments || []).length };
    }) });
  } catch (e) { next(e); }
}

export async function createCustomer(req, res, next) {
  try {
    if (!isAdmin(req)) return res.status(403).json({ success: false, message: "Admin access required." });
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const company = String(req.body.company || "").trim();
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false, message: "Enter a valid customer name and email." });
    if (await User.exists({ email })) return res.status(409).json({ success: false, message: "An account with this email already exists." });
    const temporaryPassword = crypto.randomBytes(12).toString("base64url");
    const user = await User.create({ name, email, passwordHash: await bcrypt.hash(temporaryPassword, 12), role: "customer" });
    const workspace = await CustomerWorkspace.create({ userId: user._id, company, customerStatus: "Lead" });
    addActivity(workspace, "Customer record created by admin", "account");
    await workspace.save();
    res.status(201).json({ success: true, customer: safeUser(user), temporaryPassword, message: "Share this temporary password securely. The customer should change it after signing in." });
  } catch (e) { if (e.code === 11000) return res.status(409).json({ success: false, message: "An account with these details already exists." }); next(e); }
}

export async function customerDetail(req, res, next) {
  try {
    if (!isAdmin(req)) return res.status(403).json({ success: false, message: "Admin access required." });
    const user = await User.findOne({ _id: req.params.id, role: "customer" }).select("name email username role createdAt");
    if (!user) return res.status(404).json({ success: false, message: "Customer not found." });
    const workspace = await ensureWorkspace(user._id);
    res.json({ success: true, customer: safeUser(user), workspace });
  } catch (e) { next(e); }
}

export async function updateCustomer(req, res, next) {
  try {
    if (!isAdmin(req)) return res.status(403).json({ success: false, message: "Admin access required." });
    const user = await User.findOne({ _id: req.params.id, role: "customer" }).select("name email role");
    if (!user) return res.status(404).json({ success: false, message: "Customer not found." });
    const workspace = await ensureWorkspace(user._id);
    const { company, phone, customerStatus, notes } = req.body;
    if (company !== undefined) workspace.company = String(company).slice(0, 160);
    if (phone !== undefined) workspace.phone = String(phone).slice(0, 40);
    if (notes !== undefined) workspace.notes = String(notes).slice(0, 3000);
    if (["Lead", "Active", "Paused", "Former"].includes(customerStatus)) workspace.customerStatus = customerStatus;
    if (req.body.name !== undefined) user.name = String(req.body.name).trim().slice(0, 100);
    if (req.body.email !== undefined) {
      const email = String(req.body.email).trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false, message: "Enter a valid email." });
      if (await User.exists({ email, _id: { $ne: user._id } })) return res.status(409).json({ success: false, message: "That email is already in use." });
      user.email = email;
    }
    addActivity(workspace, "Customer profile updated by admin", "account");
    await Promise.all([workspace.save(), user.save()]);
    res.json({ success: true, customer: safeUser(user), workspace });
  } catch (e) { next(e); }
}

export async function addRecord(req, res, next) {
  try {
    if (!isAdmin(req)) return res.status(403).json({ success: false, message: "Admin access required." });
    const user = await User.findOne({ _id: req.params.id, role: "customer" });
    if (!user) return res.status(404).json({ success: false, message: "Customer not found." });
    const workspace = await ensureWorkspace(user._id);
    const body = req.body || {};
    if (req.params.kind === "projects") {
      if (!String(body.name || "").trim()) return res.status(400).json({ success: false, message: "Project name is required." });
      workspace.projects.push({ name: String(body.name).trim(), description: String(body.description || ""), status: body.status, progress: Number(body.progress || 0), dueDate: body.dueDate || null });
      addActivity(workspace, `Project added: ${body.name}`, "project");
    } else if (req.params.kind === "products") {
      if (!String(body.name || "").trim()) return res.status(400).json({ success: false, message: "Product name is required." });
      workspace.products.push({ name: String(body.name).trim(), description: String(body.description || ""), amount: Number(body.amount || 0), currency: String(body.currency || "INR"), status: body.status || "Active", purchaseDate: body.purchaseDate || new Date() });
      addActivity(workspace, `Product assigned: ${body.name}`, "product");
    } else if (req.params.kind === "payments") {
      if (!String(body.title || "").trim() || !Number.isFinite(Number(body.amount)) || Number(body.amount) < 0) return res.status(400).json({ success: false, message: "Payment title and valid amount are required." });
      workspace.payments.push({ title: String(body.title).trim(), amount: Number(body.amount), currency: String(body.currency || "INR"), status: body.status || "Pending", invoiceNumber: String(body.invoiceNumber || ""), dueDate: body.dueDate || null, notes: String(body.notes || "") });
      addActivity(workspace, `Payment record added: ${body.title}`, "payment");
    } else return res.status(404).json({ success: false, message: "Unknown record type." });
    await workspace.save();
    res.status(201).json({ success: true, workspace });
  } catch (e) { next(e); }
}

export async function updateRecord(req, res, next) {
  try {
    if (!isAdmin(req)) return res.status(403).json({ success: false, message: "Admin access required." });
    const user = await User.findOne({ _id: req.params.id, role: "customer" });
    if (!user) return res.status(404).json({ success: false, message: "Customer not found." });
    const workspace = await ensureWorkspace(user._id);
    const field = req.params.kind;
    const item = workspace[field]?.id(req.params.recordId);
    if (!item || !["projects", "products", "payments"].includes(field)) return res.status(404).json({ success: false, message: "Record not found." });
    const allowed = field === "projects" ? ["name", "description", "status", "progress", "dueDate"] : field === "products" ? ["name", "description", "status", "amount", "currency", "purchaseDate"] : ["title", "amount", "currency", "status", "invoiceNumber", "dueDate", "paidAt", "notes"];
    for (const key of allowed) if (req.body[key] !== undefined) item[key] = req.body[key];
    if (field === "payments" && item.status === "Paid" && !item.paidAt) item.paidAt = new Date();
    addActivity(workspace, `${field.slice(0, -1)} updated: ${item.name || item.title}`, field === "payments" ? "payment" : field === "products" ? "product" : "project");
    await workspace.save();
    res.json({ success: true, workspace });
  } catch (e) { next(e); }
}

export async function adminReply(req, res, next) {
  try {
    if (!isAdmin(req)) return res.status(403).json({ success: false, message: "Admin access required." });
    const message = String(req.body.message || "").trim();
    if (!message || message.length > 4000) return res.status(400).json({ success: false, message: "Message must be 1–4000 characters." });
    const user = await User.findOne({ _id: req.params.id, role: "customer" });
    if (!user) return res.status(404).json({ success: false, message: "Customer not found." });
    const workspace = await ensureWorkspace(user._id);
    workspace.messages.push({ senderId: req.user._id, senderName: "Omnivera Admin", senderRole: "admin", message });
    addActivity(workspace, "Message sent by Omnivera", "message", message.slice(0, 160));
    await workspace.save();
    res.status(201).json({ success: true, workspace });
  } catch (e) { next(e); }
}

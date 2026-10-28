import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function publicUser(user) { return { id: user._id, name: user.name || user.username || "User", email: user.email || "", username: user.username || "", role: user.role }; }
function issueToken(user) {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) throw new Error("JWT_SECRET must be set to a random secret of at least 32 characters.");
  return jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: "12h", issuer: "omnivera-api", audience: "omnivera-studio" });
}
export async function register(req, res, next) {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    if (name.length < 2 || name.length > 100) return res.status(400).json({ success: false, message: "Enter your name (2–100 characters)." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return res.status(400).json({ success: false, message: "Enter a valid email address." });
    if (password.length < 8 || password.length > 128) return res.status(400).json({ success: false, message: "Password must be between 8 and 128 characters." });
    if (await User.exists({ email })) return res.status(409).json({ success: false, message: "An account with this email already exists. Please sign in." });
    const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 12), role: "customer" });
    return res.status(201).json({ success: true, token: issueToken(user), user: publicUser(user) });
  } catch (err) { if (err.code === 11000) return res.status(409).json({ success: false, message: "An account with these details already exists." }); next(err); }
}
export async function login(req, res, next) {
  try {
    const identifier = String(req.body.identifier || req.body.email || req.body.username || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    if (!identifier || !password) return res.status(400).json({ success: false, message: "Enter your username/email and password." });
    const query = identifier.includes("@") ? { email: identifier } : { username: identifier };
    const user = await User.findOne(query).select("+passwordHash name email username role");
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ success: false, message: "Incorrect username/email or password." });
    return res.json({ success: true, token: issueToken(user), user: publicUser(user) });
  } catch (err) { next(err); }
}
export async function me(req, res) { res.json({ success: true, user: publicUser(req.user) }); }

import RecentWork from "../models/RecentWork.js";

const isAdmin = (req) => req.user?.role === "admin";

const toArray = (value) => {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === "string") return value.split(/[\n,]/).map((v) => v.trim()).filter(Boolean);
  return [];
};

export async function listRecentWorks(req, res, next) {
  try {
    const works = await RecentWork.find().sort({ order: 1, createdAt: -1 }).lean();
    res.json({ success: true, works });
  } catch (e) { next(e); }
}

export async function getRecentWork(req, res, next) {
  try {
    const work = await RecentWork.findById(req.params.id).lean();
    if (!work) return res.status(404).json({ success: false, message: "Work not found." });
    res.json({ success: true, work });
  } catch (e) { next(e); }
}

export async function createRecentWork(req, res, next) {
  try {
    if (!isAdmin(req)) return res.status(403).json({ success: false, message: "Admin access required." });
    const body = req.body || {};
    const title = String(body.title || "").trim();
    if (!title) return res.status(400).json({ success: false, message: "Title is required." });
    const work = await RecentWork.create({
      title,
      category: String(body.category || "").trim(),
      client: String(body.client || "").trim(),
      summary: String(body.summary || "").trim(),
      description: String(body.description || "").trim(),
      details: String(body.details || "").trim(),
      imageUrl: String(body.imageUrl || "").trim(),
      gallery: toArray(body.gallery),
      technologies: toArray(body.technologies),
      year: String(body.year || "").trim(),
      link: String(body.link || "").trim(),
      featured: Boolean(body.featured),
      order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
    });
    res.status(201).json({ success: true, work });
  } catch (e) { next(e); }
}

export async function updateRecentWork(req, res, next) {
  try {
    if (!isAdmin(req)) return res.status(403).json({ success: false, message: "Admin access required." });
    const work = await RecentWork.findById(req.params.id);
    if (!work) return res.status(404).json({ success: false, message: "Work not found." });
    const body = req.body || {};
    const allowed = ["title", "category", "client", "summary", "description", "details", "imageUrl", "year", "link", "featured", "order"];
    for (const key of allowed) {
      if (body[key] !== undefined) {
        if (key === "title" || key === "category" || key === "client" || key === "summary" || key === "description" || key === "details" || key === "imageUrl" || key === "year" || key === "link") {
          work[key] = String(body[key] || "").trim();
        } else if (key === "featured") {
          work[key] = Boolean(body[key]);
        } else if (key === "order") {
          work[key] = Number.isFinite(Number(body[key])) ? Number(body[key]) : work[key];
        }
      }
    }
    if (body.gallery !== undefined) work.gallery = toArray(body.gallery);
    if (body.technologies !== undefined) work.technologies = toArray(body.technologies);
    if (!work.title) return res.status(400).json({ success: false, message: "Title is required." });
    await work.save();
    res.json({ success: true, work });
  } catch (e) { next(e); }
}

export async function deleteRecentWork(req, res, next) {
  try {
    if (!isAdmin(req)) return res.status(403).json({ success: false, message: "Admin access required." });
    const work = await RecentWork.findByIdAndDelete(req.params.id);
    if (!work) return res.status(404).json({ success: false, message: "Work not found." });
    res.json({ success: true });
  } catch (e) { next(e); }
}
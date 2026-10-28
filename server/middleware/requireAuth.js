import jwt from "jsonwebtoken";
import User from "../models/User.js";
export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!token) return res.status(401).json({ success: false, message: "Please sign in to continue." });
    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ success: false, message: "Server authentication is not configured." });
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.sub).select("name email username role");
    if (!user) return res.status(401).json({ success: false, message: "Account not found. Please sign in again." });
    req.user = user; next();
  } catch { return res.status(401).json({ success: false, message: "Your session is invalid or expired. Please sign in again." }); }
}

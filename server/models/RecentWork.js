import mongoose from "mongoose";

const recentWorkSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  category: { type: String, trim: true, maxlength: 120, default: "" },
  client: { type: String, trim: true, maxlength: 160, default: "" },
  summary: { type: String, trim: true, maxlength: 500, default: "" },
  description: { type: String, trim: true, maxlength: 5000, default: "" },
  details: { type: String, trim: true, maxlength: 10000, default: "" },
  imageUrl: { type: String, trim: true, default: "" },
  gallery: { type: [String], default: [] },
  technologies: { type: [String], default: [] },
  year: { type: String, trim: true, maxlength: 40, default: "" },
  link: { type: String, trim: true, maxlength: 500, default: "" },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.RecentWork || mongoose.model("RecentWork", recentWorkSchema);
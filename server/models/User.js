import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, maxlength: 100, default: "" },
  email: { type: String, trim: true, lowercase: true, unique: true, sparse: true, index: true },
  username: { type: String, trim: true, lowercase: true, unique: true, sparse: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["customer", "admin"], default: "customer", immutable: true },
}, { timestamps: true });
export default mongoose.model("User", userSchema);

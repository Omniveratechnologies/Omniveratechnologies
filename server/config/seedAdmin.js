import bcrypt from "bcryptjs";
import User from "../models/User.js";

// Creates the first admin only when none exists. Later username/password changes
// should be made directly in MongoDB using a bcrypt password hash. This seeder
// never resets an existing admin's credentials on each server restart.
export async function seedAdmin() {
  const username = String(process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
  const password = String(process.env.ADMIN_PASSWORD || "");
  if (!password) {
    console.warn("ADMIN_PASSWORD is not set; skipping initial admin creation.");
    return;
  }
  if (password.length < 12) throw new Error("ADMIN_PASSWORD must be at least 12 characters for initial admin setup.");
  const existingAdmin = await User.findOne({ role: "admin" });
  if (existingAdmin) { console.log("Admin account already exists; existing database credentials were preserved."); return; }
  const usernameTaken = await User.exists({ username });
  if (usernameTaken) throw new Error("ADMIN_USERNAME is already used by a non-admin account. Choose a different admin username.");
  const admin = await User.create({ name: "Omnivera Admin", username, passwordHash: await bcrypt.hash(password, 12), role: "admin" });
  console.log(`Initial admin account created in MongoDB (username: ${admin.username}).`);
}

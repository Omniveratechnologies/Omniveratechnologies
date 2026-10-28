import { Router } from "express";
import contactRoutes from "./contactRoutes.js";
import authRoutes from "./authRoutes.js";
import workspaceRoutes from "./workspaceRoutes.js";

const router = Router();
router.use("/contact", contactRoutes);
router.use("/auth", authRoutes);
router.use("/workspace", workspaceRoutes);
export default router;

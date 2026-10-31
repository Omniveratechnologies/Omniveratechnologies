import { Router } from "express";
import contactRoutes from "./contactRoutes.js";
import authRoutes from "./authRoutes.js";
import workspaceRoutes from "./workspaceRoutes.js";
import recentWorkRoutes from "./recentWorkRoutes.js";

const router = Router();
router.use("/contact", contactRoutes);
router.use("/auth", authRoutes);
router.use("/workspace", workspaceRoutes);
router.use("/recent-works", recentWorkRoutes);
export default router;

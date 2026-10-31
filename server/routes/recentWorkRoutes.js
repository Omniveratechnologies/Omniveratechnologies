import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import {
  listRecentWorks,
  getRecentWork,
  createRecentWork,
  updateRecentWork,
  deleteRecentWork,
} from "../controllers/recentWorkController.js";

const router = Router();
router.get("/", listRecentWorks);
router.get("/:id", getRecentWork);
router.post("/", requireAuth, createRecentWork);
router.patch("/:id", requireAuth, updateRecentWork);
router.delete("/:id", requireAuth, deleteRecentWork);

export default router;
import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import {
  myWorkspace, sendMessage, listCustomers, createCustomer, customerDetail,
  updateCustomer, addRecord, updateRecord, adminReply
} from "../controllers/workspaceController.js";

const router = Router();
router.use(requireAuth);
router.get("/me", myWorkspace);
router.post("/me/messages", sendMessage);
router.get("/customers", listCustomers);
router.post("/customers", createCustomer);
router.get("/customers/:id", customerDetail);
router.patch("/customers/:id", updateCustomer);
router.post("/customers/:id/messages", adminReply);
router.post("/customers/:id/:kind", addRecord);
router.patch("/customers/:id/:kind/:recordId", updateRecord);
export default router;

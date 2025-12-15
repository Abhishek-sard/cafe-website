import express from "express";

import { createOrder, getUserOrders, getAllOrders, updateOrderStatus, getAdminStats } from "../controllers/orderController.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/myorders", verifyToken, getUserOrders);
router.get("/all", verifyToken, authorizeRoles("admin"), getAllOrders);
router.put("/:id/status", verifyToken, authorizeRoles("admin"), updateOrderStatus);
router.get("/stats", verifyToken, authorizeRoles("admin"), getAdminStats);

export default router;

import express from "express";
import { getProducts, addProduct, deleteProduct } from "../controllers/productController.js";
import { createQuery, getAllQueries } from "../controllers/queryController.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Products
router.get("/products", getProducts);
router.post("/products", verifyToken, authorizeRoles("admin"), upload.single("image"), addProduct);
router.delete("/products/:id", verifyToken, authorizeRoles("admin"), deleteProduct);

// Queries
router.post("/queries", createQuery);
router.get("/queries", verifyToken, authorizeRoles("admin"), getAllQueries);

export default router;

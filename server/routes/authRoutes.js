import express from "express";
import { register, login, logout, userProfile, verifyEmail, forgotPassword, resetPassword, refreshToken } from "../controllers/authController.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh-token", refreshToken);

router.get("/verify/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/me", verifyToken, userProfile);
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => res.json({ message: "Admin Dashboard" }));

export default router;

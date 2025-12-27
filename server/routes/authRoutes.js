import express from "express";
import { register, login, logout, userProfile, verifyEmail, forgotPassword, resetPassword, refreshToken, changePassword } from "../controllers/authController.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";
import uploadUser from "../middleware/uploadUser.js";

const router = express.Router();

router.post("/register", uploadUser.single("profileImage"), register);
router.post("/login", login);
router.post("/change-password", verifyToken, changePassword);
router.get("/logout", logout);
router.get("/refresh-token", refreshToken);

router.get("/verify/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/me", verifyToken, userProfile);
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => res.json({ message: "Admin Dashboard" }));

export default router;

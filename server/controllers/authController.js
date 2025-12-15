import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../Config/email.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already used" });

    const hashPass = await bcrypt.hash(password, 10);
    const emailToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name, // Auto-verified for development
      email,
      password: hashPass,
      role,
      emailToken,
      isVerified: true,
    });

    // const url = `${process.env.CLIENT_URL}/verify/${emailToken}`;
    // await sendEmail(
    //   email,
    //   "Verify your email",
    //   `Click this link to verify: ${url}`
    // );

    res.json({ message: "Registration successful. You can now login." });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ emailToken: token });
  if (!user) return res.status(400).json({ message: "Invalid token" });

  user.isVerified = true;
  user.emailToken = null;
  await user.save();

  res.json({ message: "Email verified successfully" });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.isVerified)
      return res.status(401).json({ message: "Please verify your email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
      })
      .json({ accessToken, user });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(403).json({ message: "Invalid token" });

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken").json({ message: "Logged out" });
};

export const userProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const url = `${process.env.CLIENT_URL}/reset-password/${token}`;
  await sendEmail(email, "Reset Password", `Click here to reset: ${url}`);

  res.json({ message: "Password reset email sent" });
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  res.json({ message: "Password reset successful" });
};

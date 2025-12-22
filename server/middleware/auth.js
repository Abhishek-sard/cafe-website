import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = (req, res, next) => {
  let token = req.cookies.token;
  
  // If no cookie token, try to get from Authorization header
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

export const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    // Check if user exists and has a role
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    try {
      // Fetch user from database to ensure we have the latest role
      const user = await User.findById(req.user.id).select("role");
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      
      // Use role from database (most up-to-date) or fallback to token role
      const userRole = user.role || req.user.role;
      
      if (!userRole || !roles.includes(userRole)) {
        return res.status(403).json({ 
          message: "Access Denied",
          details: `Required role: ${roles.join(" or ")}, Your role: ${userRole || "none"}`
        });
      }
      
      // Update req.user with the database role
      req.user.role = userRole;
      next();
    } catch (error) {
      console.error("Error in authorizeRoles:", error);
      return res.status(500).json({ message: "Authorization check failed" });
    }
  };
};

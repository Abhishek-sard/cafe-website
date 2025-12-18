import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import { connectDB } from "./Config/db.js";

dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();

        const email = "admin@elitecafe.com";
        const password = "adminpassword123";
        const name = "Admin User";

        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            console.log("Admin user already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new User({
            name,
            email,
            password: hashedPassword,
            role: "admin",
            isVerified: true,
        });

        await admin.save();
        console.log("Admin user created successfully");
        console.log("Email:", email);
        console.log("Password:", password);
        process.exit(0);
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();

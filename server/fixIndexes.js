import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./Config/db.js";
import Order from "./models/Order.js";

dotenv.config();

const fixIndexes = async () => {
    try {
        await connectDB();
        console.log("Connected to DB");

        const indexes = await Order.collection.indexes();
        console.log("Current Indexes:", indexes);

        try {
            if (indexes.some(idx => idx.name === "orderId_1")) {
                console.log("Found problematic index 'orderId_1'. Dropping it...");
                await Order.collection.dropIndex("orderId_1");
                console.log("Successfully dropped 'orderId_1' index.");
            } else {
                console.log("'orderId_1' index not found.");
            }
        } catch (err) {
            console.error("Error dropping index:", err.message);
        }

        process.exit(0);
    } catch (error) {
        console.error("Script Error:", error);
        process.exit(1);
    }
};

fixIndexes();

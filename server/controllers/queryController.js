import Query from "../models/Query.js";
import { sendEmail } from "../Config/email.js";

export const createQuery = async (req, res) => {
    try {
        const query = new Query(req.body);
        await query.save();

        // Send email notification to admin
        const adminEmail = "elitecafe23@gmail.com";
        const subject = `New Query Received: ${req.body.subject}`;
        const message = `
            You have received a new message from your Cafe Website contact form:
            
            Name: ${req.body.name}
            Email: ${req.body.email}
            Subject: ${req.body.subject}
            Message: ${req.body.message}
            
            You can also view this query in your Admin Dashboard.
        `;

        try {
            await sendEmail(adminEmail, subject, message);
        } catch (emailError) {
            console.error("Failed to send notification email:", emailError);
            // We don't want to fail the request if email fails
        }

        res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllQueries = async (req, res) => {
    try {
        const queries = await Query.find().sort({ createdAt: -1 });
        res.json(queries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteQuery = async (req, res) => {
    try {
        const { id } = req.params;
        await Query.findByIdAndDelete(id);
        res.json({ message: "Query deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

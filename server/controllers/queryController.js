import Query from "../models/Query.js";

export const createQuery = async (req, res) => {
    try {
        const query = new Query(req.body);
        await query.save();
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

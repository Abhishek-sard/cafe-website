import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addProduct = async (req, res) => {
    try {
        const { name, category, price, description } = req.body;
        
        // Get image path from uploaded file
        const imagePath = req.file 
            ? `/uploads/products/${req.file.filename}` 
            : req.body.image; // Fallback to URL if no file uploaded

        const product = new Product({
            name,
            category,
            price: parseFloat(price),
            description,
            image: imagePath,
        });
        
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

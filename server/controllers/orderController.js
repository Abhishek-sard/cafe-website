import Order from "../models/Order.js";

// Create new order
export const createOrder = async (req, res) => {
    try {
        console.log("Creating order for user:", req.user.id); // DEBUG LOG
        const { items, totalAmount, shippingAddress, paymentMethod, isPaid, paidAt, paymentResult } = req.body;

        if (items && items.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }

        const order = new Order({
            user: req.user.id,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod,
            isPaid: isPaid || false,
            paidAt: paidAt || null,
            paymentResult: paymentResult || {},
        });

        const createdOrder = await order.save();
        console.log("Order created:", createdOrder._id); // DEBUG LOG
        res.status(201).json(createdOrder);
    } catch (error) {
        console.error("Create Order Error:", error); // DEBUG LOG
        res.status(500).json({ message: error.message });
    }
};

// Get logged in user orders
export const getUserOrders = async (req, res) => {
    try {
        console.log("Fetching orders for user:", req.user.id); // DEBUG LOG
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        console.log("Found orders:", orders.length); // DEBUG LOG
        res.json(orders);
    } catch (error) {
        console.error("Get User Orders Error:", error); // DEBUG LOG
        res.status(500).json({ message: error.message });
    }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
    try {
        console.log("Admin fetching all orders..."); // DEBUG LOG
        const orders = await Order.find({}).populate("user", "id name email").sort({ createdAt: -1 });
        console.log(`Admin found ${orders.length} orders`); // DEBUG LOG
        res.json(orders);
    } catch (error) {
        console.error("Admin Get All Orders Error:", error); // DEBUG LOG
        res.status(500).json({ message: error.message });
    }
};
// Update Order Status (Admin)
export const updateOrderStatus = async (req, res) => {
    try {
        console.log(`Updating order ${req.params.id} to ${req.body.status}`); // DEBUG LOG
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = req.body.status;

        if (order.status === 'Delivered') {
            order.isPaid = true;
        }

        await order.save();
        res.json(order);
    } catch (error) {
        console.error("Update Status Error:", error); // DEBUG LOG
        res.status(500).json({ message: error.message });
    }
};

// Get Admin Stats
export const getAdminStats = async (req, res) => {
    try {
        console.log("Fetching admin stats..."); // DEBUG LOG
        const orders = await Order.find();
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
        const pendingOrders = orders.filter(o => o.status === 'Pending').length;
        const completedOrders = orders.filter(o => o.status === 'Delivered').length;

        console.log("Stats calculated:", { totalOrders, totalRevenue }); // DEBUG LOG
        res.json({ totalOrders, totalRevenue, pendingOrders, completedOrders });
    } catch (error) {
        console.error("Get Stats Error:", error); // DEBUG LOG
        res.status(500).json({ message: error.message });
    }
};

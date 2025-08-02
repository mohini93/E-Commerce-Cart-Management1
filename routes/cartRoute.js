const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const redisClient = require("../config/redis");

const router = express.Router();

// Add item to cart
router.post("/add", async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product || product.stock < quantity) {
            return res.status(400).json({ message: "Product not available" });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) cart = new Cart({ user: userId, items: [] });

        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        await redisClient.set(`cart:${userId}`, JSON.stringify(cart));

        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// View cart
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const cachedCart = await redisClient.get(`cart:${userId}`);
        if (cachedCart) return res.json(JSON.parse(cachedCart));

        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        await redisClient.set(`cart:${userId}`, JSON.stringify(cart));
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Remove item
router.delete("/remove", async (req, res) => {
    const { userId, productId } = req.body;

    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        await redisClient.set(`cart:${userId}`, JSON.stringify(cart));

        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Checkout
router.post("/checkout", async (req, res) => {
    const { userId } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        for (const item of cart.items) {
            const product = await Product.findById(item.product._id);
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for ${product.name}` });
            }
            product.stock -= item.quantity;
            await product.save();
        }

        await Cart.deleteOne({ user: userId });
        await redisClient.del(`cart:${userId}`);

        res.json({ message: "Checkout successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

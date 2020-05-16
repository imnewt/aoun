const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aoun", { useNewUrlParser: true, useUnifiedTopology: true });

const Order = require("../models/order.model");

router.get('/orders', async (req, res) => {
    const orders = await Order.find();
    res.send(orders);
})

router.post('/orders/create', async (req, res) => {
    const { userId, cartItems, phone, address, no, date, totalMoney } = req.body;
    let newOrder = new Order();
    newOrder.userId = userId;
    newOrder.phone = phone;
    newOrder.cartItems = cartItems;
    newOrder.address = address;
    newOrder.date = date;
    newOrder.no = no;
    newOrder.money = totalMoney;
    newOrder.save((err, order) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            })
        } else {
            return res.send({
                success: true,
                message: 'Order successfully'
            })
        }
    })
})

module.exports = router;
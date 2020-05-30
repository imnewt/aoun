const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { MONGO_URL } = require("../../env");
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const Order = require("../models/order.model");

// GET ORDERS
router.post('/orders', async (req, res) => {
    const { user } = req.body;
    if (user.email === "admin@aoun.com") {
        await Order.find({ isChecked: false }, (err, order) => {
            if(err) {
                res.send({
                    success: false,
                    message: "Sever Error 2"
                })
            }
            res.send({
                success: true,
                message: order
            })
        })
    }
    else {
        await Order.find({ userEmail: user.email }, (err, order) => {
            if(err) {
                res.send({
                    success: false,
                    message: "Sever Error 3"
                })
            }
            res.send({
                success: true,
                message: order
            })
        })
    }
})

// CREATE NEW ORDER
router.post('/orders/create', async (req, res) => {
    const { user, cartItems, no, date, totalMoney } = req.body;
    let newOrder = new Order();
    newOrder.userEmail = user.email;
    newOrder.cartItems = cartItems;
    newOrder.date = date;
    newOrder.no = no;
    newOrder.totalMoney = totalMoney;
    newOrder.save((err, order) => {
        if (err) {
            return res.send({
                success: false,
                message: "Error when creating new order"
            })
        } 
        else {
            return res.send({
                success: true,
                message: "Order success"
            })
        }
    })
})

// ACCEPT ORDER
router.post('/orders/accept', async (req, res) => {
    const { order } = req.body;
    await Order.findByIdAndUpdate(
        { _id: order._id }, 
        { $set: { isChecked: true }})
})

// DELETE ORDER
router.post('/orders/delete', async (req, res) => {
    const { order } = req.body;
    await Order.findByIdAndRemove({ _id: order._id })
})

module.exports = router;
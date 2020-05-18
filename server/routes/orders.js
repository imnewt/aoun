const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aoun", { useNewUrlParser: true, useUnifiedTopology: true });

const Order = require("../models/order.model");

router.get('/orders', async (req, res) => {
    // const orders = await Order.find();
    // res.send(orders);
    const { authorization } = req.headers;
    // console.log("authorization: ", authorization);
    if(!authorization) {
        res.send({
            success: false,
            message: "Server Error 1"
        })
    }
    const id = authorization.replace('Bearer ', "");
    // console.log(id);
    if (id === "Wbthx7q7xJXohFu4VuhXDPPLEPw1") {
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
        await Order.find({ userId: id }, (err, order) => {
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
                message: "Error when creating new order"
            })
        } else {
            return res.send({
                success: true,
                message: "Order success"
            })
        }
    })
})

module.exports = router;
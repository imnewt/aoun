var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    userId: String,
    address: String,
    phone: String,
    cartItems: Array,
    totalMoney: Number,
    date: String,
    no: String,
    isChecked: {
        type: Boolean,
        default: false
    }
});

var Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;
const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    Product:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }],
    User:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    Quantity:[
    {
        type: Number,
        required: true
    }],
    Address:
    {
        type: String,
        required: true
    },
    Bill:
    {
        type: Number
    },
    PaymentMethod:
    {
        type: String,
        required: true
    }
})

const Orders = mongoose.model('orders', orderSchema);
module.exports = Orders;
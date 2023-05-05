const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Product = require('../models/Products');
const Order = require('../models/Orders');
const getBoth = require('../middleware/getBoth');
const {body, validationResult} = require('express-validator');
const getAdmin = require('../middleware/getAdmin');
const getUser = require('../middleware/getUser');


router.post('/orderProduct', getBoth,
[
    body('addr', 'Enter Address').isLength({min: 1})
],
async(req,res) => {

    const errors = validationResult(req);
    const user = await User.findById(req.user);
    const {addr, bill, paymentMethod} = req.body;
    const productss = req.body.Product;
    const qt = req.body.Quantity;

    if (!errors.isEmpty())
    {
        return res.status(400).json({error: errors.array()});
    }

    const products = new Array();
    
    for (let i=0; i < productss.length; ++i) 
    {
        const product = await Product.findById(productss[i]);
        products.push(product);
    }
    console.log(products);
    const order = await Order.create({Product: products, User: user, Quantity: qt, Address: addr, Bill: bill, PaymentMethod: paymentMethod});
    return res.json(order);

});

router.get('/getOrdersAdmin', getAdmin, async(req,res) => {
    let orders = await Order.find();
    return orders ? res.json({orders}) : res.json({error: 'No orders yet'});
});

router.get('/getOrders', getUser, async(req,res) => {
    let orders = await Order.find();
    return orders ? res.json({orders}) : res.json({error: 'No orders yet'});
});

module.exports = router;


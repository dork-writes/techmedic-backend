const express = require('express');
const router = express.Router();
const OrderRepair = require('../models/OrderRepair');
const User = require('../models/Users');
const {body, validationResult} = require('express-validator');
const getBoth = require('../middleware/getBoth');
const getAdmin = require('../middleware/getAdmin');
const getUser = require('../middleware/getUser');

router.post('/addOrderRepair', getUser,
[
    body('name','Name of device.').isLength({ min: 1 }),
    body('details','Device details required.').isLength({ min: 1 }),
    body('location','Location is required.').isLength({ min: 1 }),
], async(req, res) => {

    const errors = validationResult(req);
    const {name, details, location} = req.body;

    const user = await User.findById(req.user);

    if (!errors.isEmpty())
    {
        return res.status(400).json({error: errors.array()});
    }

    const orderRepair = await OrderRepair.create({user, name, details, location, status:'Pending'});
    return res.json(orderRepair);
});

router.post('/updatePrice/:orderRepairId', getAdmin, 
[
    body('price', 'Price is required').isLength({min: 1})
], async (req, res) => {
    const { price } = req.body;
    const { orderRepairId } = req.params;
    let orderRepair = await OrderRepair.findByIdAndUpdate(orderRepairId.toString(),{price});
    orderRepair = await OrderRepair.findById(orderRepairId.toString());
    return orderRepair ? res.json({orderRepair}) : res.json({error: 'No repair order found'});
})

router.get('/getOrderRepair/', getBoth, async (req, res)=>{
    let orderRepair = await OrderRepair.find();
    orderRepair = orderRepair.length ? orderRepair.filter(r => r.user.toString() === req.user.toString()) : orderRepair;
    console.log(orderRepair);
    return orderRepair.length ? res.json({orderRepair}) : res.json({error: 'No repair order found'});
})

router.get('/getOrderRepair/:orderRepairId', getBoth, async (req, res)=>{
    const {orderRepairId} = req.params;
    let orderRepair = await OrderRepair.findById(orderRepairId.toString());
    return orderRepair ? res.json({orderRepair}) : res.json({error: 'No repair order found'});
})

router.put('/putOrderRepair/:orderRepairId', getAdmin, async (req, res)=>{
    const {orderRepairId} = req.params;
    const {status} = req.body
    let orderRepair = await OrderRepair.findByIdAndUpdate(orderRepairId.toString(),{status});
    orderRepair = await OrderRepair.findById(orderRepairId.toString());
    return orderRepair ? res.json({orderRepair}) : res.json({error: 'No repair order found'});
})

module.exports = router;
const express = require('express');
const router = express.Router();
const Products = require('../models/Products');
const getAdmin = require('../middleware/getAdmin');
const {body, validationResult} = require('express-validator');
const getBoth = require('../middleware/getBoth');

router.post('/addproduct', getAdmin,
[
    body('name', 'Name is required.').isLength({min: 1}),
    body('inStock', 'No of items available in stock').isLength({min: 1}),
    body('price', 'Price is required.').isLength({min: 1}),
], async(req, res) =>
{
    const errors = validationResult(req);
    const {name, inStock, price, picture, description} = req.body;
    
    if (!errors.isEmpty())
    {
        return res.status(400).json({error: errors.array()});
    }

    const product = await Products.create({name, inStock, price, picture, description});
    return res.json(product);
});

router.get('/getproducts', getBoth, async(req, res) =>
{
    try
    {
        const products = await Products.find();
        return res.json({products});
    }

    catch(err)
    {
        return res.status(500).json({error: 'Unexpected error occured.'});
    }
})

router.get('/getproduct/:id', getBoth, async(req, res)=>
{
    try
    {
        const {id} = req.params;
        const product = await Products.findById(id);
        return product ? res.json(product): res.json({error: 'The product does not exist.'});  
    }

    catch(err)
    {
        return res.status(500).json({error: 'Unexpected error occured.'});
    }
});
module.exports = router;
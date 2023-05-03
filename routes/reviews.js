const express = require('express');
const User = require('../models/Users');
const Product = require('../models/Products');
const router = express.Router();
const Reviews = require('../models/Reviews');
const getAdmin = require('../middleware/getAdmin');
const {body, validationResult} = require('express-validator');

router.post('/addReview', getAdmin, 
[
    body('review', 'Enter Review').isLength({min: 1}),
    body('rating', 'Rate out of 5').isLength({min: 1}),
], async(req, res) =>
{
    const errors = validationResult(req);
    const {productid, review, rating} = req.body;
    const user = await User.findById(req.user);
    const product = await Product.findById(productid);
    
    if (!errors.isEmpty())
    {
        return res.status(400).json({error: errors.array()});
    }

    console.log(user);
    console.log(product);
    const Review = await Reviews.create({User:user, Product:product, Review:review, Rating:rating});
    return res.json(Review);
});

router.get('/getReview/:productid', getAdmin, async (req, res)=>{
    const {productid} = req.params;
    let reviews = await Reviews.find();
    reviews = reviews.length ? reviews.filter(r => r.Product.toString() === productid.toString()) : reviews;
    return reviews.length ? res.json({reviews}) : res.json({error: 'Be the first to add a review'});
})

module.exports = router;
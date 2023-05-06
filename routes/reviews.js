const express = require('express');
const User = require('../models/Users');
const Product = require('../models/Products');
const router = express.Router();
const Reviews = require('../models/Reviews');
const getBoth = require('../middleware/getBoth');
const {body, validationResult} = require('express-validator');
const getUser = require('../middleware/getUser');

router.post('/addReview', getUser, 
[
    body('review', 'Enter Review').isLength({min: 1}),
    body('rating', 'Rate out of 5').isLength({min: 1}),
], async(req, res) =>
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({error: errors.array()});
    }
    const {productid, review, rating} = req.body;
    const user = await User.findById(req.user);
    const product = await Product.findById(productid);
    

    // console.log(user);
    // console.log(product);
    const Review = await Reviews.create({User:user, Product:product, Review:review, Rating:rating});
    return res.json(Review);
});

router.get('/getReview/:productid', getBoth, async (req, res)=>{
    const {productid} = req.params;
    let reviews = await Reviews.find();
    reviews = reviews.length ? reviews.filter(r => r.Product.toString() === productid.toString()) : reviews;
    return reviews.length ? res.json({reviews}) : res.json({error: 'No reviews yet.'});
})

router.get('/getFeatured', async(req, res) =>
{
    try
    {
        const reviews = await Reviews.find();
        let happyCustomers = 0;
        let featuredReviews = [];
        let dictionary = {};

        for (let i of reviews)
        {
            if (i.Rating >= 4)
            {
                if (featuredReviews.length < 8)
                {
                    featuredReviews.push(i);
                    if(dictionary[i.User] != 0)
                    {
                        dictionary[i.User] = 1;
                    }
                }

                if (dictionary[i.User] == 1)
                {
                    dictionary[i.User] = 0;
                    happyCustomers++;
                }
            }
        }

        for (let i of reviews)
        {
            let username = await User.findById(i.User).select('username');
            i.User = username;
        }
        
        return res.json({reviews: featuredReviews, happyCustomers});
    }

    catch(err)
    {
        return res.status(500).json({error: 'Unexpected error occured.'});
    }
});

module.exports = router;
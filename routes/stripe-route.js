const express = require('express');
const expressRouter = require('express-router');
const stripe = require('stripe')('sk_test_51N6GHbKY9np3slNiPtu3D49W5P0L5uILQEcvTBVhR4Tju3aFfUqATAi0ThKqytGKzHMPHcD4QLjlRyyxdU8Es6MZ00eeo6bHtJ');
const {v4: uuidv4} = require('uuid');
const router = express.Router();

router.get('/', (req, res, next) =>
{
    console.log("GET Response from Researcher");
    return res.json({message: 'Working'});
})

router.post('/pay', async(req, res, next) =>
{
    const {token, amount} = req.body;
    console.log(token);
    const idempotencyKey = uuidv4();
    try
    {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token
        });
    
        const response = await stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        }, {idempotencyKey});
    
        return res.json(response);
    }

    catch(err)
    {
        console.log(err);
        return res.status(500).json({error: 'Unexpected error occured.'});
    }
});

module.exports = router;
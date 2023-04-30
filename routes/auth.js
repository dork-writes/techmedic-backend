const express = require('express');
const Users = require('../models/Users');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getUser = require('../middleware/getUser');
const JWT_SECRET = "(FAR)^2";

router.post('/register', 
[
    body('name', 'Name is required.').isLength({min: 1}),
    body('email', 'Email must be valid.').isEmail(),
    body('username', 'Username is required.').isLength({min: 1}),
    body('password', 'Password must be at least eight characters.').isLength({min: 8})
], async(req, res) =>
{
    const errors = validationResult(req);
    const {name, email, username, password} = req.body;
    
    if (!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    try
    {
        let user = await Users.findOne({email}) || await Users.findOne({username});
        
        if (user)
        {
            return user.email === email ? res.status(400).json({error: 'A user with this email already exists.'}) : res.status(400).json({error: 'A user with this username already exists.'});
        } 

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        user = await Users.create({name, password: encryptedPassword, email, username});

        const token = {
            user: user.id
        }

        const authToken = jwt.sign(token, JWT_SECRET);
        res.json(authToken);
    }

    catch(err)
    {
        console.log(err);
        return res.status(500).send({error: 'Unexpected error occured.'});
    }
});

router.post('/login', 
[
    body('username', 'Username is required').isLength({min: 1}),
    body('password', 'Wrong password!').isLength({min: 8})
], async(req, res) =>
{
    const errors = validationResult(req);
    const {username, password} = req.body;

    if (!errors.isEmpty())
    {
        return res.status(400).json({errors: 'Wrong username or password.'});
    }

    try
    {
        let user = await Users.findOne({username});

        if (user)
        {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (isPasswordCorrect)
            {
                const token = {
                    user: user.id
                }

                const authToken = jwt.sign(token, JWT_SECRET);
                return res.json(authToken);
            }
            
            return res.status(401).json({error: 'Wrong username or password.'});
        }

        return res.status(400).json({error: 'Wrong username or password.'});
    }

    catch(err)
    {
        return res.status(500).json({error: 'Unexpected error occured.'});
    }
});


//Always use getUser like this when authentication is required.
router.get('/getuser', getUser, async(req, res) =>
{
    try
    {
        const userID = req.user;
        const user = await Users.findById(userID).select('-password');
        return res.json(user);
    }

    catch(err)
    {
        return res.status(500).json({error: 'Unexpected error occured.'});
    }
});

module.exports = router;
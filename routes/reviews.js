const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const Reviews = require('../models/Reviews');
let getUser;
const {body, validationResult} = require('express-router');

router.get('/', (req, res)=>{
    console.log(req.body);
    res.send(req.body);
})

module.exports = router;
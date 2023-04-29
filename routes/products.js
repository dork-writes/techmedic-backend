const express = require('express');
const router = express.Router();
const Products = require('../models/Products');
let getUser;
const {body, validationResult} = require('express-router');

module.exports = router;
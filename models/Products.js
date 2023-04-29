const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },

    inStock:
    {
        type: Number,
        required: true    
    },

    picture: //stored in base64
    {
        type: String,
    },

    price:
    {
        type: Number,
        required: true
    },
    
    description:
    {
        type: String,
    }
})

const Products = mongoose.model('products', ProductsSchema);
module.exports = Products;
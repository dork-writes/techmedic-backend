const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
    User:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },

    Product:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },

    Review:
    {
        type:String,
    },

    Rating:
    {
        type: Number,
        required: true
    }
});

const Reviews = mongoose.model('reviews', ReviewsSchema);
module.exports = Reviews;
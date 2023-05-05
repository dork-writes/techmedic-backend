const mongoose = require('mongoose');

const OrderRepairSchema = new mongoose.Schema({
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },

    name:
    {
        type: String,
        required: true
    },

    details:
    {
        type: String,
        required: true
    },

    location:
    {
        type: String,
        required: true
    },

    price:
    {
        type: Number
    },

    status:
    {
        type: String,
        required: true
    }
});

const OrderRepair = mongoose.model('orderRepair', OrderRepairSchema);
module.exports = OrderRepair;
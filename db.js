const mongoose = require('mongoose');

const connectToMongo = () =>
{
    mongoose.connect("mongodb://localhost:27017/techmedic", () =>
    {
        console.log("Connected to DB");
    })
}

module.exports = connectToMongo;
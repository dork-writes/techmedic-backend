const connectToMongo = require('./db');
connectToMongo();
let cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/orderRepair', require('./routes/orderRepair'));
app.use('/api/stripe', require('./routes/stripe-route'));

app.get('/', (req,res) =>
{
  res.send('Hello World');
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`)
})


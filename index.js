const connectToMongo = require('./db');
connectToMongo();
let cors = require('cors');

const express = require('express');
const app = express();
app.use(cors());
const port = 5000;

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

app.use('/api/reviews', require('./routes/reviews'));

app.get('/', (req,res) =>
{
  res.send('Hello World');
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`)
})
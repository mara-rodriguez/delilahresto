const express = require('express');
const app = express();

const products = require('./routes/products');
const users = require('./routes/users');
const orders = require('./routes/orders');


app.use('/', products);
app.use('/', users);
app.use('/', orders);


app.listen(3000, ()=> console.log('listening'));

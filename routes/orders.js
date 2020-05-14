const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


router.use(bodyParser.json());


const jwt = require('jsonwebtoken');
const configuration = require('../configuration/configuration.json')


const repository = require('../repository/orders');
const productsRepository = require('../repository/products');
const usersRepository = require('../repository/users');
const intercept = require('../middlewares/authentication');



router.post('/orders', intercept.userAuthentication, async (req, res) => {

    var amount = 0;
    var description = 'Detalle: ';
    var prod = [];

    try {
        
        var orderReq =  req.body;
        var order = JSON.parse(JSON.stringify(orderReq));

        var user = await usersRepository.getUserByUsername(order.user);
    
    
        for (let i = 0; i < order.detail.length; i++) {
            const product = order.detail[i];
            var p = await productsRepository.getProductById(product.prod_id);
            description = description + p.name.toString() + ' x'+ product.cant.toString() + '--';
            amount += p.cost * product.cant;
        };


        await repository.insertOrder(user.id, description, amount, order);

    res.status(200).send(`Order detail: '${description}'. Total cost: ${amount}`)
    
    } catch (error) {
        console.log(error);
    }

});



router.get('/orders',  intercept.userAuthentication, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerify = jwt.verify(token, configuration.jwtSign);
    const orders = await repository.getOrdersByUsername(tokenVerify.username, tokenVerify.role);
    res.json({ orders });
}); 



router.put('/orders/:orderID', intercept.userAuthentication, intercept.userAdmin, (req, res) => { 
    try {
        const id = req.params.orderID;
        const status = req.body;
        repository.alterStatus(id, status);
        res.status(200).send('Updated successful');
    } catch {
        res.status(400).send('Ups! Missing data')
    }
}); 


router.delete('/orders/:orderID', intercept.userAuthentication, intercept.userAdmin, (req, res) => { 
    try {
        const id = req.params.orderID;
        repository.deleteOrder(id);
        res.status(200).send('Deleted successfully');
    } catch {
        res.status(400).send('Ups! Missing data')
    }
}); 




module.exports = router;
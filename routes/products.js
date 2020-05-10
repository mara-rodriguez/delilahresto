const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


router.use(bodyParser.json());


const repository = require('../repository/products');
const intercept = require('../middlewares/authentication');



//LIST
router.get('/products', intercept.userAuthentication, (req, res) => { 
    repository.getProducts()
    .then(result => res.json(result));
});



//CREATE
router.post('/products', intercept.userAuthentication, intercept.userAdmin, async (req, res) => { 
    try {
        let result = await repository.addProduct(req.body);
        console.log(result);
        res.status(201).json(result);
    } catch (error) {
       res.status(401).send('Unauthorized access'); 
    }
});



//DELETE
router.put('/products/:productID', intercept.userAuthentication, intercept.userAdmin, (req, res) => { 
    try {
        const id = req.params.productID;
        const status = req.body;
        repository.removeProduct(id, status);
        res.status(200).send('deleted successful');
    } catch {
        res.status(400).send('Ups! Missing data')
    }
}); 



//ALTER
router.put('/products/:productID', intercept.userAuthentication, intercept.userAdmin, (req, res) => {
    try {
        const id = req.params.productID
        const product = req.body;
        repository.alterProduct(id, product);
        res.status(201).send('Updated successful');
    } catch {
        res.status(400).send('Ups! Missing data')
    }
});

module.exports = router;
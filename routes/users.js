const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


const repository = require('../repository/users');
const configuration = require('../configuration/configuration.json');
const intercept = require('../middlewares/authentication');


router.use(bodyParser.json());



router.post('/users/register', (req, res) => { 
    try { 
        repository.createUser(req.body)
        res.status(201).json('Yay! User Created!');
    } catch {
        res.status(400).send('Ups! Missing data.');
    }
});



router.post('/users/login', async (req, res) => {
    const user = await repository.getUser(req.body.username, req.body.password);
    console.log(user);

    if(user != "") {
        const jsonUser = JSON.parse(JSON.stringify(user[0]));
        const token = jwt.sign(jsonUser, configuration.jwtSign);
        res.status(200).send(`Tu token es: ${token}`)
        } 
        else res.status(401).send('Invalid user'); 
});



router.get('/users', intercept.userAdmin, (req, res) => { 
    repository.getAll() 
    .then(result => res.json(result));
});


router.get('/userdata', intercept.userAuthentication, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerify = jwt.verify(token, configuration.jwtSign);
    const username = await repository.getUserByUsername(tokenVerify.username);
    res.json({ username });
})
/*MUST HAVE: LOGOUT?*/

module.exports = router;
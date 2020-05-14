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
    try{
        const user = await repository.getUser(req.body.username, req.body.password);
        console.log(user);
        if(user != "") {
            const jsonUser = JSON.parse(JSON.stringify(user));
            const token = jwt.sign(jsonUser, configuration.jwtSign);
            res.status(200).send(`Tu token es: ${token}`)
            } 
            else {  res.status(401).send('Invalid user');   }
        } catch(error) {
            res.status(401).send(error);
        }

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


router.put('/users/:usersID', intercept.userAuthentication, intercept.userAdmin, (req, res) => {
    try {
        const id = req.params.usersID
        const user = req.body;
        repository.alterUser(id, user);
        res.status(201).send('Updated successful');
    } catch {
        res.status(400).send('Ups! Missing data')
    }
});




router.delete('/users/:usersID', intercept.userAuthentication, intercept.userAdmin, (req, res) => { 
    try {
        const id = req.params.usersID;
        repository.removeUser(id);
        res.status(200).send('deleted successful');
    } catch {
        res.status(400).send('Ups! Missing data')
    }
});



module.exports = router;
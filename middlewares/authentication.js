const jwt = require('jsonwebtoken');
const configuration = require('../configuration/configuration.json')



function userAuthentication (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        //console.log(token);
        const tokenVerify = jwt.verify(token, configuration.jwtSign);
        if (tokenVerify) {
            next();
        } else { 
            res.status(401).send('unauthorized');
        }
    } catch (err) {
        res.status(401).send('unauthorized');
    }
}



function userAdmin (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const tokenVerify = jwt.verify(token, configuration.jwtSign);
        if (tokenVerify.role == 'admin') {
            next();
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (error) {
       res.status(401).send('Unauthorized');
    }
}



module.exports = { userAuthentication, userAdmin };
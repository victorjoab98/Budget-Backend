//Validate token
const jwt = require('jsonwebtoken');
const environment = require('../utils/environment');


function validateTokenMiddleware (req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if( token && token.startsWith('Bearer')){
        token = token.substring(7, token.length);
    }else{
        return res.status(401).send({
            message: 'Token does not exist. '
        });
    }

    jwt.verify( token, environment.secretJwt, 
            (err, decoded) => { 
                if( err ){
                    return res.status(401).send({
                        message: 'Invalid token.'
                    });
                }
                next();
            }
    );
}

module.exports = { validateTokenMiddleware };
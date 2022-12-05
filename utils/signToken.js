const jwt = require('jsonwebtoken');
const environment = require('./environment');

const signToken = ( payload ) => {
    const token = jwt.sign( payload, environment.jwtSecret, { expiresIn: '7 days' } );
    return token;
}

module.exports = signToken;
require('dotenv').config();

const environment = {
    port: process.env.PORT || 4000,
    dbUser: process.env.DB_USER || root,
    dbPassword: process.env.DB_PASSWORD || password,
}

module.exports = environment 
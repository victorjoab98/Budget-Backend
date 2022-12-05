require('dotenv').config();

const environment = {
    port: process.env.PORT || '4000',
    dbPort: process.env.DB_PORT || '5432',
    dbHost: process.env.DB_HOST || 'localhost',
    dbUser: process.env.DB_USER || 'root',
    dbPassword: process.env.DB_PASSWORD || 'root',
    dbDialect: process.env.DB_DIALECT || 'postgres',
    dbName: process.env.DB_NAME || 'budget-db',
    jwtSecret: process.env.JWT_SECRET
}

module.exports = environment 
const env = require('../utils/environment');

module.exports = {
  development: {
    "username": env.dbUser,
    "password": env.dbPassword,
    "database": env.dbName,
    "host": env.dbHost,
    "dialect": env.dbDialect,
  },
//   production: {
//     url: environment.dbURL,
//     dialectOptions: {
//       ssl: {
//         rejectUnauthorized: false
//       }
//     }
//   }
}
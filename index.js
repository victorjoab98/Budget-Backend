const express = require('express');
const { testConnectionDB } = require('./database/connection');
const { errorMiddleware } = require('./middlewares/errors.middleware');
const routerApi = require('./routes');
const env = require('./utils/environment');

const app = express();

testConnectionDB();

app.use( express.json() );

routerApi(app);

app.use( errorMiddleware );
 
//Listen request
app.listen( env.port, ()=>{
    console.log('Server running in port: ' + env.port )
})
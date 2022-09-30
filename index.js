const express = require('express');
const env = require('./utils/environment');

const app = express();

//Listen request
app.listen( env.port, ()=>{
    console.log('Server running in port: ' + env.port )
})
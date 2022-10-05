const customerRouter = require('./customer.route');

function routerApi(app){
    app.use('/api/customer', customerRouter);
}

module.exports = routerApi;
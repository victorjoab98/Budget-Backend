const customerRouter = require('./customer.route');
const accountRouter = require('./account.route');
const transferRouter = require('./transfer.route');
const currencyRouter = require('./currency.route');
const bankRouter = require('./bank.route');

function routerApi(app){
    app.use('/api/customer', customerRouter);
    app.use('/api/account', accountRouter);
    app.use('/api/transfers', transferRouter);
    app.use('/api/currency', currencyRouter);
    app.use('/api/bank', bankRouter);
}

module.exports = routerApi;
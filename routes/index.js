const appRouter = require('./app.route');
const authRouter = require('./auth.route');
const customerRouter = require('./customer.route');
const accountRouter = require('./account.route');
const transferRouter = require('./transfer.route');
const currencyRouter = require('./currency.route');
const bankRouter = require('./bank.route');
const recordRouter = require('./record.route');
const categoryRouter = require('./category.route');

function routerApi(app){
    app.use('/api/app', appRouter); 
    app.use('/api/auth', authRouter);
    app.use('/api/customer', customerRouter);
    app.use('/api/account', accountRouter);
    app.use('/api/transfers', transferRouter);
    app.use('/api/currency', currencyRouter);
    app.use('/api/bank', bankRouter);
    app.use('/api/records', recordRouter);
    app.use('/api/categories', categoryRouter);
}

module.exports = routerApi;
const {Router} = require('express');
const validatorMiddleware = require('../middlewares/validator.middelware');
const CustomerService = require('../services/customer.service');
const AccountService = require('../services/account.service');
const { getCustomerAccounts } = require('../validators/account.validator');
const { newCustomerValidator } = require('../validators/customer.validator');

const router = Router();
const customerService = new CustomerService();
const accountService = new AccountService();

router.post(
    '/register',
    validatorMiddleware( newCustomerValidator, 'body'),
    async (req, res, next) => {
        try {
            const { userData, ...customerData } = req.body;
            const newCustomer = await customerService.registerCustomer( customerData, userData);
            res.json(newCustomer);
        } catch (error) {
            next(error);
        }
});

router.get(
    '/get/all/:customerId',
    validatorMiddleware( getCustomerAccounts, 'params'),
    async (req, res, next) => {
        try {
            const accounts = await accountService.getCustomerAccounts( req.params.customerId );
            const recordsPercentages = await accountService.getPercentageTypeRecords( req.params.customerId );
            res.status(200).json( { accounts, recordsPercentages });
        } catch (error) {
            next(error)
        }
    }
);
module.exports = router;
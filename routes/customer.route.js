const {Router} = require('express');
const validatorMiddleware = require('../middlewares/validator.middelware');
const CustomerService = require('../services/customer.service');
const { newCustomerValidator } = require('../validators/customer.validator');

const router = Router();
const customerService = new CustomerService();

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

module.exports = router;
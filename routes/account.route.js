const {Router} = require('express');
const validatorMiddleware = require('../middlewares/validator.middelware');
const AccountService = require('../services/account.service');
const { newAccountValidator, getAccount, getCustomerAccounts } = require('../validators/account.validator');

const router =  Router();
const accountService = new AccountService()

router.post(
    '/',
    validatorMiddleware( newAccountValidator, 'body'),
    async (req, res, next) => {
        try {
            const dataAccount = req.body;
            const newAccount = await accountService.createAccount(dataAccount);
            res.json(newAccount);
        } catch (error) {
            next(error);
        }
    }
)

router.get(
    '/myaccount/:id',
    validatorMiddleware( getAccount, 'params'),
    async (req, res, next) => {
        try {
            const account = await accountService.getAccountByID(req.params.id);
            res.json(account);
        } catch (error) {
            next(error);
        }
    }
)

router.get(
    '/myaccounts/:customerId',
    validatorMiddleware( getCustomerAccounts, 'params'),
    async (req, res, next) => {
        try {
            const accounts = await accountService.getCustomerAccounts( req.params.customerId );
            res.json(accounts);
        } catch (error) {
            next(error);
        }
    }
)
module.exports = router;
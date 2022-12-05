const {Router} = require('express');
const validatorMiddleware = require('../middlewares/validator.middelware');
const AccountService = require('../services/account.service');
const { newAccountValidator, getAccount, getCustomerAccounts, updateBalanceValidator, accountIdValidator } = require('../validators/account.validator');

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

router.patch(
    '/update-balance/:accountId',
    validatorMiddleware( accountIdValidator, 'params'),
    validatorMiddleware( updateBalanceValidator, 'body'),
    async (req, res, next) => {
        try {
            const { accountId } = req.params;
            const { newBalance } = req.body;
            const account = await accountService.updateBalance(accountId, newBalance);
            res.status(200).json({
                ok: true,
                message: 'Balance updated successfully.',
                account
            });
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
const { Router } = require('express');
const validatorMiddleware = require('../middlewares/validator.middelware');
const BankService = require('../services/bank.service');
const { newBankValidator } = require('../validators/bank.validator');

const router = new Router();
const bankService = new BankService();

router.post(
    '/',
    validatorMiddleware( newBankValidator, 'body' ),
    async (req, res, next ) => {
        try {
            const dataBank = req.body;
            const newBank = bankService.createBank(dataBank);
            res.json(newBank);
        } catch (error) {
            next(error);
        }
    }
)

router.get(
    '/get/all',
    async (req, res, next) => {
        try {
            const banks = await bankService.getAllBanks();
            res.json(banks);
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;

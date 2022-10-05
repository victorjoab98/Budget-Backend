const { Router } = require('express');
const validatorMiddleware = require('../middlewares/validator.middelware');
const { newBankValidator } = require('../validators/bank.validator');

const router = new Router();
const bankService = new BankServie();

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
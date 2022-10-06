const { Router } = require('express');
const validatorMiddleware = require('../middlewares/validator.middelware');
const CurrencyService = require('../services/currency.service');
const { newCurrencyValidator } = require('../validators/currency.validator');

const router = new Router();
const currencyService = new CurrencyService();

router.post(
    '/',
    validatorMiddleware( newCurrencyValidator, 'body' ),
    async (req, res, next ) => {
        try {
            const dataCurrency = req.body;
            const newCurrency = currencyService.createBank(dataCurrency);
            res.json(newCurrency);
        } catch (error) {
            next(error);
        }
    }
)

router.get(
    '/get/all',
    async (req, res, next) => {
        try {
            const currencies = await currencyService.findAllCurrencies();
            res.json(currencies);
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;
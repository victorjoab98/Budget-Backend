const { Router } = require('express');
const BankService = require('../services/bank.service');
const CategoryService = require('../services/category.service');
const CurrencyService = require('../services/currency.service');
const RecordService = require('../services/record.service');

const router = new Router();
const recordService = new RecordService();
const currencyService = new CurrencyService();
const bankService = new BankService();
const categoryService = new CategoryService();


router.get(
    '/get/all', 
    async (req, res, next) => {
        try {
            const recordTypes = await recordService.getTypesRecords();
            const categories = await categoryService.getCategories();
            const banks = await bankService.getAllBanks();
            const currencies = await currencyService.findAllCurrencies();
            res.status(200).json({recordTypes, categories, banks, currencies});
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router;


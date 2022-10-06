const joi = require('joi');

const newCurrencyValidator = joi.object({
    symbol: joi.string().required(),
    code: joi.string().required(),
    name: joi.string().required()
});

module.exports = { newCurrencyValidator };
const joi = require('joi');

const newBankValidator = joi.object({
    name: joi.string().required()
});

module.exports = { newBankValidator };
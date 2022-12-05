const joi = require('joi');

const integer = joi.number().integer();
const double = joi.number();


const newTransferValidator = joi.object({
    debitAmount: double.required(),
    debitAccount: integer.required(),
    creditAccount: integer.required()
});

module.exports = {
    newTransferValidator
}
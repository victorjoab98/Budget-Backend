const joi = require('joi');

const integer = joi.number().integer();
const string = joi.string();


const newAccountValidator = joi.object({
    numberAccount: string.required(),
    balance: joi.number().required(),
    currencyId: integer.required(),
    bankId: integer.required(),
    customerId: integer.required()
});

const getCustomerAccounts =  joi.object({
    customerId: integer.required()
});

const getAccount = joi.object({
    id: integer.required()
});

module.exports = {
    newAccountValidator,
    getCustomerAccounts,
    getAccount
}
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

const accountIdValidator = joi.object({
    accountId: integer.required()
});

const updateBalanceValidator = joi.object({
    newBalance: joi.number().required()
});

const getCustomerAccounts =  joi.object({
    customerId: integer.required()
});

const getAccount = joi.object({
    id: integer.required()
});

module.exports = {
    newAccountValidator,
    accountIdValidator,
    updateBalanceValidator,
    getCustomerAccounts,
    getAccount
}
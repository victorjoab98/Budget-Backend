const joi = require('joi');

const integer = joi.number().integer();
const number = joi.number();
const string = joi.string();


const newRecordValidator = joi.object({
    userId: integer.required(),
    accountId: integer.required(),
    categoryId: integer.required(),
    amount: number.required(),
    description: string.allow('').optional(),
    recordTypeId: integer.required() 
});

const newTransferValidator = joi.object({
    customerId: integer.required(),
    amount: number.required(),
    sourceAccountId: integer.required(),
    destinationNumberAccount: integer.required(),
    bankId: integer.required(),
    description: string.allow('').optional()
});

module.exports = {
    newRecordValidator,
    newTransferValidator
}
const joi = require('joi');

const simpleString = joi.string();

const newCustomerValidator = joi.object({
    name: simpleString.required(),
    email: simpleString.email({ tlds: false }).required(),
    userData: joi.object({
        username: simpleString.required(),
        password: simpleString.required()
    }).required()
});

module.exports = {
    newCustomerValidator
};
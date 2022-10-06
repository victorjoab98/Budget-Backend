const { User, UserSchema } = require('./User');
const { Customer, CustomerSchema, } = require('./Customer');
const { Bank, BankSchema  } = require('./Bank');
const { Account, AccountSchema } = require('./Account');
const { Transfer, TransferSchema } = require('./Transfers');
const { Currency, CurrencySchema } = require('./Currency');

function setupModels(sequelize){

    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Bank.init( BankSchema, Bank.config(sequelize));
    Currency.init( CurrencySchema, Currency.config(sequelize));
    Account.init( AccountSchema, Account.config(sequelize));
    Transfer.init( TransferSchema, Transfer.config(sequelize));

    User.associate(sequelize.models);
    Customer.associate(sequelize.models);
    Account.associate(sequelize.models);
}

module.exports = setupModels;
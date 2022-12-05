const { User, UserSchema } = require('./User');
const { Customer, CustomerSchema, } = require('./Customer');
const { Bank, BankSchema  } = require('./Bank');
const { Account, AccountSchema } = require('./Account');
const { Transfer, TransferSchema } = require('./Transfers');
const { Currency, CurrencySchema } = require('./Currency');
const { Category, CategorySchema } = require('./Category');
const { RecordType, RecordTypeSchema } = require('./RecordType');
const { Record, RecordSchema } = require('./Record');

function setupModels(sequelize){

    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Bank.init( BankSchema, Bank.config(sequelize));
    Currency.init( CurrencySchema, Currency.config(sequelize));
    Account.init( AccountSchema, Account.config(sequelize));
    Transfer.init( TransferSchema, Transfer.config(sequelize));
    Category.init( CategorySchema, Category.config(sequelize));
    RecordType.init( RecordTypeSchema, RecordType.config(sequelize));
    Record.init( RecordSchema, Record.config(sequelize));

    User.associate(sequelize.models);
    Customer.associate(sequelize.models);
    Account.associate(sequelize.models);
    Record.associate(sequelize.models);
}

module.exports = setupModels;
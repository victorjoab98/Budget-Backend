const {Model, DataTypes, Sequelize } = require('sequelize');
const { BANK_TABLE } = require('./Bank');
const { CURRENCY_TABLE } = require('./Currency');
const { CUSTOMER_TABLE } = require('./Customer');

const ACCOUNT_TABLE = "account";
const ACCOUNT_MODEL_NAME = "Account";

const AccountSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    numberAccount: {
        allowNull: false,
        field: 'no_account',
        type: DataTypes.STRING
    },
    balance: {
        allowNull: false,
        type: DataTypes.DOUBLE
    },
    currencyId: {
        field: 'currency_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CURRENCY_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    bankId: {
        field: 'bank_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: BANK_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    customerId: {
        field: 'custormer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CUSTOMER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }, 
    createdAt: {
        field: 'creted_at',
        type: Sequelize.DATE,
    },
}

class Account extends Model{

    static associate( models ){
        
        this.hasMany( models.Transfer, { as: 'expense', foreignKey: 'debit_account', } );
        this.hasMany( models.Transfer, { as: 'income', foreignKey: 'credit_account', } );

        this.belongsTo( models.Currency, { as: 'currency', foreignKey: 'currencyId'});
        this.belongsTo( models.Bank, { as: 'bank', foreignKey: 'bankId'}); 
        this.belongsTo( models.Customer, { as: 'customer', foreignKey: 'customerId'}); 
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: ACCOUNT_TABLE,
            modelName: ACCOUNT_MODEL_NAME,
            timestamps: false
        }
    }
}

module.exports = {
    ACCOUNT_TABLE,
    ACCOUNT_MODEL_NAME,
    AccountSchema,
    Account
}
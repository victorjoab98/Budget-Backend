const {Model, DataTypes } = require('sequelize');
const { BANK_TABLE } = require('./Bank');
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
        type: DataTypes.BIGINT
    },
    currency: {
        allowNull: false,
        type: DataTypes.STRING
    },
    balance: {
        allowNull: false,
        type: DataTypes.DOUBLE
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
    }

}

class Account extends Model{

    static associate( models ){
        
        this.hasMany( models.Transfer, { as: 'expense', foreignKey: 'debitAccount', } );
        this.hasMany( models.Transfer, { as: 'income', foreignKey: 'creditAccount', } );

        this.belongsTo( models.Bank, { as: 'bank', foreignKey: 'bankId'}); 
        this.belongsTo( models.Customer, { as: 'customer', foreignKey: 'customerId'}); 
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: ACCOUNT_TABLE,
            modelName: ACCOUNT_MODEL_NAME,
            timestamps: true
        }
    }
}

module.exports = {
    ACCOUNT_TABLE,
    ACCOUNT_MODEL_NAME,
    AccountSchema,
    Account
}
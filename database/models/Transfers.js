const {Model, DataTypes, Sequelize } = require('sequelize');
const { ACCOUNT_TABLE } = require('./Account');

const TRANSFER_TABLE = "transfers";
const TRANSFER_MODEL_NAME = "Transfer";

const TransferSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT
    },//Debit Info
    debitAmount:{
        field:'debit_amount',
        allowNull: false,
        type: DataTypes.DOUBLE
    },
    debitCurrency: {
        field: 'debit_currency',
        allowNull: false,
        type: DataTypes.STRING
    },
    debitAccount: {
        allowNull: false,
        field: 'debit_account',
        type: DataTypes.INTEGER,
        references: {
            model: ACCOUNT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE'
    },//Credit Info
    creditAmount:{
        field: 'credit_amount',
        allowNull: false,
        type: DataTypes.DOUBLE
    },
    creditCurrency:{
        field: 'credit_currency',
        allowNull: false,
        type: DataTypes.STRING
    },
    creditAccount: {
        allowNull: false,
        field: 'credit_account',
        type: DataTypes.INTEGER,
        references: {
            model: ACCOUNT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE'
    },
    exchangeRate: {
        field: 'exchange_rate',
        allowNull: false,
        type: DataTypes.DOUBLE
    },
    createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE
    }
}

class Transfer extends Model{
    static config(sequelize){
        return {
            sequelize,
            tableName: TRANSFER_TABLE,
            modelName: TRANSFER_MODEL_NAME,
            timestamps: false
        }
    }
}

module.exports = {
    TRANSFER_TABLE,
    TRANSFER_MODEL_NAME,
    TransferSchema,
    Transfer   
}
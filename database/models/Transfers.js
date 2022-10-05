const {Model, DataTypes, Sequelize } = require('sequelize');

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
        allowNull: false,
        type: DataTypes.DOUBLE
    },
    debitCurrency: {
        allowNull: false,
        type: DataTypes.STRING
    },
    debitAccount: {
        allowNull: false,
        field: 'debit_account',
        type: DataTypes.INTEGER,
        references: {
            model: TRANSFER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE'
    },//Credit Info
    creditAmount:{
        allowNull: false,
        type: DataTypes.DOUBLE
    },
    creditCurrency:{
        allowNull: false,
        type: DataTypes.STRING
    },
    creditAccount: {
        allowNull: false,
        field: 'credit_account',
        type: DataTypes.INTEGER,
        references: {
            model: TRANSFER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE'
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
        }
    }
}

module.exports = {
    TRANSFER_TABLE,
    TRANSFER_MODEL_NAME,
    TransferSchema,
    Transfer   
}
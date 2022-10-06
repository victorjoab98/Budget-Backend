const {DataTypes, Model} = require('sequelize');

const CURRENCY_TABLE = "currencies";
const CURRENCY_MODEL_NAME = "Currency";

const CurrencySchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    code: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    symbol: {
        allowNull: false,
        type: DataTypes.STRING
    },
    name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    }
}

class Currency extends Model {
    
    static config( sequelize ){
        return {
            sequelize,
            tableName: CURRENCY_TABLE,
            modelName: CURRENCY_MODEL_NAME,
            timestamps: false
        }
    } 
}

module.exports = {
    CURRENCY_TABLE,
    CURRENCY_MODEL_NAME,
    CurrencySchema,
    Currency,
}
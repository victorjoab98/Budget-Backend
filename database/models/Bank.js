const {DataTypes, Model} = require('sequelize');

const BANK_TABLE = "banks";
const BANK_MODEL_NAME = "Bank";

const BankSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    }
}

class Bank extends Model {
    
    static config( sequelize ){
        return {
            sequelize,
            tableName: BANK_TABLE,
            modelName: BANK_MODEL_NAME,
            timestamps: false
        }
    } 
}

module.exports = {
    BANK_TABLE,
    BANK_MODEL_NAME,
    BankSchema,
    Bank
}
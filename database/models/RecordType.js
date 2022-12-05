const {DataTypes, Model} = require('sequelize');

const RECORD_TYPE_TABLE = "record_types";
const RECORD_TYPE_MODEL = "RecordType";

const RecordTypeSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    }
}

class RecordType extends Model {
    
    static config( sequelize ){
        return {
            sequelize,
            tableName: RECORD_TYPE_TABLE,
            modelName: RECORD_TYPE_MODEL,
            timestamps: false
        }
    } 
}

module.exports = {
    RECORD_TYPE_TABLE,
    RECORD_TYPE_MODEL,
    RecordTypeSchema,
    RecordType
}
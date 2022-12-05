const {DataTypes, Model} = require('sequelize');
const { ACCOUNT_TABLE } = require('./Account');
const { CATEGORY_TABLE } = require('./Category');
const { RECORD_TYPE_TABLE } = require('./RecordType');

const RECORD_TABLE = "records";
const RECORD_MODEL_NAME = "Record";

const RecordSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    accountId: {
        allowNull: false,
        field: 'account_id',
        type: DataTypes.INTEGER,
        references: {
            model: ACCOUNT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE'
    },
    categoryId: {
        allowNull: false,
        field: 'category_id',
        type: DataTypes.INTEGER,
        references: {
            model: CATEGORY_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE'
    },
    amount: {
        allowNull: false,
        type: DataTypes.DECIMAL(10,2)
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE
    },
    recordTypeId: {
        allowNull: false,
        field: 'record_type',
        type: DataTypes.INTEGER,
        references: {
            model: RECORD_TYPE_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE'
    }
}

class Record extends Model {
    
    static associate( models ){
        this.belongsTo(models.Account, { as: 'account_ref', foreignKey: 'accountId' });
        this.belongsTo(models.Category, { as: 'category_ref',foreignKey: 'categoryId' });
        this.belongsTo(models.RecordType, { as: 'recordtype_ref', foreignKey: 'recordTypeId' });
    }

    static config( sequelize ){
        return {
            sequelize,
            tableName: RECORD_TABLE,
            modelName: RECORD_MODEL_NAME,
            timestamps: false
        }
    } 
}

module.exports = {
    RECORD_TABLE,
    RECORD_MODEL_NAME,
    RecordSchema,
    Record
}
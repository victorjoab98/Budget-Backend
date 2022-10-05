const {Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./User');

const CUSTOMER_TABLE = "customers";
const CUSTOMER_MODEL_NAME = "Customer";

const CustomerSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name:{
        allowNull: false,
        type: DataTypes.STRING
    },
    email:{
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    userId:{
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

class Customer extends Model {

    static associate(models){
        this.belongsTo(models.User, { as: 'user' })
        this.hasMany( models.Account, { as: 'accounts', foreignKey: 'customerId', } );
    }

    static config(sequelize){
        return{
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: CUSTOMER_MODEL_NAME,
            timestamps: false
        }
    }
}

module.exports = {
    CUSTOMER_TABLE,
    CUSTOMER_MODEL_NAME,
    CustomerSchema,
    Customer
}
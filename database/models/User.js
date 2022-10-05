const {Model, DataTypes, Sequelize} = require('sequelize');

const USER_TABLE = 'users';
const USER_MODEL_NAME = 'User';

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    username: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    }
}

class User extends Model {
    
    static associate(models){
        this.hasOne(models.Customer, {
            as: 'customer',
            foreignKey: 'userId'
        });
    }

    static config(sequelize){
        return {
            sequelize, 
            tableName: USER_TABLE,
            modelName: USER_MODEL_NAME,
            timestamps: false
        }
    }
}



module.exports = {
    USER_TABLE,
    USER_MODEL_NAME,
    UserSchema,
    User
}
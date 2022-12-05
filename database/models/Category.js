const {DataTypes, Model} = require('sequelize');
const {categoryTypes} = require('../../utils/categoriesTypes');
const CATEGORY_TABLE = "categories";
const CATEGORY_MODEL_NAME = "Category";

const CategorySchema = {
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
    },
    type: {
        allowNull: false,
        type: DataTypes.SMALLINT,
        get(){
            const { name } = categoryTypes.find( type => type.id === this.getDataValue('type') );
            return name;
        }
    }
}

class Category extends Model {
    
    static config( sequelize ){
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: CATEGORY_MODEL_NAME,
            timestamps: false
        }
    } 
}

module.exports = {
    CATEGORY_TABLE,
    CATEGORY_MODEL_NAME,
    CategorySchema,
    Category
}
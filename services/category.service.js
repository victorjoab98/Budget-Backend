const { sequelize } = require('../database/connection');
const { categoryTypes } = require('../utils/categoriesTypes');
const { models } = sequelize;

class CategoryService{
    
    async getCategories(){
        const categories = await models.Category.findAll();
        return categories;
    };


    async findOneByProp( prop, value, transaction ){
        const category = await models.Category.findOne({
            where: { [prop]: value }
        }, { transaction });

        return category;
    }

    // async isCategoryPositive( categoryId ){
    //     const category = await this.findOneByProp( 'id', categoryId );
    //     const { type } = category.dataValues;
    //     return categoryTypes.some( t => t.id === type && t.name === 'Income' );
    // }
}

module.exports = CategoryService;
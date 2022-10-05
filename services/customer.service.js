const { sequelize } = require('../database/connection');
const { ExceptionMessage } = require('../exceptions/generic.exception');
const UserService = require('./user.service');
const { models } = sequelize;

const userService = new UserService();

class CustomerService{

    async registerCustomer( customerData, userData ){
        const transaction = await sequelize.transaction();
        try {
            const customer = await this.findOneByProp( 'email', customerData.email);
            if(customer){
                throw new ExceptionMessage('The email is already used.', 'User email exist');
            }

            const newUser = await userService.createUser(userData, transaction);
            const newCustomer = await models.Customer.create({
                ...customerData,
                userId: newUser.dataValues.id,
            }, {transaction});

            await transaction.commit();
            return newCustomer
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
         
    }


    async findOneByProp( prop, value ){
        const customer = await models.Customer.findOne({
            where: { [prop]: value }
        });
        return customer;
    }
}

module.exports = CustomerService;
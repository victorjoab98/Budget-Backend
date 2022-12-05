const { sequelize } = require('../database/connection');
const { ExceptionMessage } = require('../exceptions/generic.exception');
const signToken = require('../utils/signToken');
const AccountService = require('./account.service');
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

            await models.Account.create({
                numberAccount: `Cash`,
                balance: 0,
                currencyId: customerData.preferredCurrency,
                bankId: 0,
                customerId: newCustomer.id,
                createdAt: new Date()
            }, { transaction });

            const token = signToken(
                { 
                    id: newUser.dataValues.id, 
                    username: newUser.dataValues.username, 
                    name: newCustomer.dataValues.name,
                    email: newCustomer.dataValues.email,
                    customerId: newCustomer.dataValues.id 
                }
            );

            const user = {
                id: newUser.dataValues.id, 
                username: newUser.dataValues.username, 
                customer: {
                    id: newCustomer.dataValues.id,
                    name: newCustomer.dataValues.name,
                    email: newCustomer.dataValues.email,
                }
            };

            await transaction.commit();
            return {
                token,
                user
            };
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
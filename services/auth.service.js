const bcrypt = require('bcrypt');
const { sequelize } = require('../database/connection');
const { ExceptionMessage } = require('../exceptions/generic.exception');
const signToken = require('../utils/signToken');
const { models } = sequelize;

class AuthService {

    async login( userData ){
        const user = await models.User.findOne({
            where: { username: userData.username },
            include: [ { model: models.Customer, as: 'customer' } ]
        });

        if(!user){
            throw new ExceptionMessage('User not found', 'User not found');
        }

        const passwordMatch = await bcrypt.compare(userData.password, user.password);
        if(!passwordMatch){
            throw new ExceptionMessage('The password is incorrect', 'Password incorrect');
        }

        const token = signToken({ 
            id: user.id, 
            username: user.username,
            name: user.dataValues.customer.name,
            email: user.dataValues.customer.email, 
            customerId: user.dataValues.customer.id
         });

        delete user.dataValues.password;
        delete user.dataValues.createdAt;
        return {
            token,
            user
        };
    }

}

module.exports = AuthService;
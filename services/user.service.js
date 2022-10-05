const bcrypt = require('bcrypt');
const {sequelize} = require('../database/connection');
const { ExceptionMessage } = require('../exceptions/generic.exception');
const { models } = sequelize;

class UserService{
    
    async createUser( data, transaction ){
        const user = await this.findOneByProp('username', data.username, transaction);
        if(user){
            throw new ExceptionMessage('The username is already used', 'Username already exists.')
        }

        const encryptPassword = await bcrypt.hash(data.password, 10); 
        const newUser = await models.User.create({
            username: data.username,
            password: encryptPassword
        }, {transaction});

        const { password, ...userInfo } = newUser;
        return userInfo;
    }

    async findOneByProp( prop, value, transaction ){
        const customer = await models.User.findOne({
            where: { [prop]: value }
        }, {transaction});
        return customer;
    }

}

module.exports = UserService;
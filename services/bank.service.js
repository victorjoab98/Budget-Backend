const { sequelize } = require('../database/connection');
const { ExceptionMessage } = require('../exceptions/generic.exception');
const { models } = sequelize;

class BankService{
    async createBank(data){
        const transaction = await sequelize.transaction();
        try {
            const bank = await this.findOneByProp('name', data.name);
            if(bank){ 
                throw new ExceptionMessage(`There is already a bank with that name: ${data.name}`, 'Name is already used.')
            }

            const newBank = await models.Bank.create({
                name: data.name
            }, { transaction });
            await transaction.commit();
            return newBank;

        } catch (error) {
            await transaction.rollback();
            throw error;
        }

    }

    async findOneByProp( prop, value, transaction){
        const bank = await models.Bank.findOne({
            where: { [prop]: value }
        }, { transaction });
        return bank;
    }

    async getAllBanks(){
        const banks = await models.Bank.findAll();
        return banks;
    }
}

module.exports = BankService;
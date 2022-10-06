const { sequelize } = require('../database/connection');
const { ExceptionMessage } = require('../exceptions/generic.exception');
const { models } = sequelize;

class CurrencyService{
    async createCurrency(data){
        const transaction = await sequelize.transaction();
        try {
            const currency = await this.findOneByProp('name', data.code);
            if(currency){ 
                throw new ExceptionMessage(`There is a currency with that code: ${data.code}`, 'Code currency is already used.')
            }

            const newCurrency = await models.Currency.create({
                name: data.name
            }, { transaction });
            await transaction.commit();
            return newCurrency;

        } catch (error) {
            await transaction.rollback();
            throw error;
        }

    }

    async findAllCurrencies(){
        const currencies = await models.Currency.findAll();
        return currencies;
    }

    async findOneByProp( prop, value, transaction){
        const currency = await models.Currency.findOne({
            where: { [prop]: value }
        }, { transaction });
        return currency;
    }
}

module.exports = CurrencyService;
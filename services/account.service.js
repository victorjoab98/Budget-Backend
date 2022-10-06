const BankService = require('./bank.service');
const CurrencyService = require('./currency.service');
const CustomerService = require('./customer.service');
const { sequelize } = require('../database/connection');
const { ExceptionMessage } = require('../exceptions/generic.exception');
const { models } = sequelize;

const bankService = new BankService();
const currencyService = new CurrencyService();
const customerService = new CustomerService();

class AccountService{
    async createAccount(data){
        const transaction = await sequelize.transaction();
        try {
            const account = await this.findOneByProp('numberAccount', data.numberAccount);
            if(account){
                throw new ExceptionMessage(`There is already an account with number: ${data.numberAccount}`, 'Number is already used.')
            }
            
            const bank = await bankService.findOneByProp('id', data.bankId, transaction);
            const currency = await currencyService.findOneByProp('id', data.currencyId, transaction);
            const customer = await customerService.findOneByProp('id', data.customerId, transaction);

            const newAccount = await models.Account.create({
                numberAccount: data.numberAccount,
                balance: data.balance,
                currencyId: currency.id,
                bankId: bank.id,
                customerId: customer.id,
                createdAt: new Date()
            }, { transaction });

            await transaction.commit();
            return newAccount;

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async findOneByProp( prop, value, transaction ){
        const account = await models.Account.findOne({
            where: { [prop]: value}
        }, { transaction });
        return account;
    }

    async getAccountByID( id ){
        const account = await models.Account.findOne({
            where: { id },
            attributes: ['id', 'numberAccount', 'balance', 'customerId'],
            include: [
                { model: models.Bank, as: 'bank', attributes: ['name'] },
                { model: models.Currency, as: 'currency' }
            ]   
        });
        const { bank, currency, ...rest} = account.dataValues;
        return {...rest, bank: bank.dataValues.name, currency: currency.dataValues};
    }   

    async getCustomerAccounts( customerId ){
        const accounts = await models.Account.findAll({
            where: { customerId },
            attributes: ['id', 'numberAccount', 'balance', 'customerId'],
            include: [
                { model: models.Bank, as: 'bank', attributes: ['name'] },
                { model: models.Currency, as: 'currency' }
            ]   
        });
        return accounts;
    }
}

module.exports = AccountService;
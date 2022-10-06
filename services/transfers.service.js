const { sequelize } = require('../database/connection');
const { ExceptionMessage } = require('../exceptions/generic.exception');
const AccountService = require('./account.service');
const CurrencyService = require('./currency.service');
const { models } = sequelize;

const accountService = new AccountService();
const currencyService = new CurrencyService();

class TransferService{
    
    async registerTransfer(data){
        const transaction = await sequelize.transaction();
        try {
            const debitAccount = await accountService.findOneByProp('id', data.debitAccount, transaction);
            const creditAccount = await accountService.findOneByProp('id', data.creditAccount, transaction);
            
            if(!debitAccount){
                throw new ExceptionMessage(`There is no account with id: ${data.debitAccount}`, 'Account not found.');
            }
            if(!creditAccount){
                throw new ExceptionMessage(`There is no account with id: ${data.creditAccount}`, 'Account not found.');
            }

            const currencies = await currencyService.findAllCurrencies();
            const debitCurrency = currencies.find(currency => currency.id === debitAccount.currencyId);
            const creditCurrency = currencies.find(currency => currency.id === creditAccount.currencyId);
            const exchangeRate = 1;

            const newTransfer = await models.Transfer.create({
                debitAmount: data.debitAmount,
                debitAccount: debitAccount.dataValues.id,
                debitCurrency: debitCurrency.dataValues.symbol,
                creditAmount: data.debitAmount * exchangeRate,
                creditCurrency: creditCurrency.dataValues.symbol,
                creditAccount: creditAccount.dataValues.id,
                exchangeRate: exchangeRate,
                createdAt: new Date()
            }, { transaction });

            const debitBalance = debitAccount.dataValues.balance - data.debitAmount;
            const creditBalance = creditAccount.dataValues.balance + data.debitAmount * exchangeRate;
            await debitAccount.update({ balance: debitBalance }, { transaction });
            await creditAccount.update({ balance: creditBalance }, { transaction });

            await transaction.commit();
            return newTransfer;
        }catch(error){
            await transaction.rollback();
            throw error;
        }        
    }
}

module.exports = TransferService;
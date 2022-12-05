const AccountService = require('./account.service');
const { Op } = require("sequelize");
const { sequelize } = require('../database/connection');
const { ExceptionMessage } = require('../exceptions/generic.exception');
const CategoryService = require('./category.service');
const { categoryTypes } = require('../utils/categoriesTypes');
const exchanges  = require('../utils/exchanges');
const { models } = sequelize;


const categoryService = new CategoryService();

class RecordService{
    
    //transfer deberia crear dos records automaticametne uno para cada cuenta
    async createRecord( dataRecord ){
        const transaction = await sequelize.transaction();
        try {
            const account = await models.Account.findOne({ 
                where: { id: dataRecord.accountId },
                include: [{ model: models.Currency, as: 'currency' }]
            }, { transaction });

            const {currency} = account;
            if (!account){ throw new ExceptionMessage(`There is no account with id: ${dataRecord.accountId}`, `Account not found`) };   

            const newRecord = {
                userId: dataRecord.userId,
                accountId: account.id,
                categoryId: dataRecord.categoryId,
                amount: dataRecord.amount,
                description: dataRecord.description,
                createdAt: new Date(),
                recordTypeId: dataRecord.recordTypeId
            };
            const record = await models.Record.create( newRecord, { transaction } );
            const recordToReturn = record.dataValues;
            
            const category = await categoryService.findOneByProp( 'id', dataRecord.categoryId );
            
            const newBalance = await this.recalculateBalanceFromCategory(category, account.balance, record.amount);
            
             await account.update({ balance: newBalance }, transaction );
            // await accountService.updateBalance( account.id, newBalance, transaction );
         
            const recordTypeName = await this.getRecordTypeName(dataRecord.recordTypeId);
            delete recordToReturn.categoryId;
            delete recordToReturn.recordTypeId;
            const typeOperation = categoryTypes.some( t => t.id === category.dataValues.type && t.name === 'Income' ) ? '+' : '-';
            const amountToDisplay = `${typeOperation}${currency.symbol}${recordToReturn.amount}`
            await transaction.commit();
            
            return { ...recordToReturn,
                amount: amountToDisplay, 
                recordType: recordTypeName,  
                category: category.dataValues.name,
                typeOperation,
                balance: newBalance };
        
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async getRecordsByBank( userId, bankId, limit = 10, offset = 0, date1 = '', date2 = '' ){

        let where = {  };

        if (date1 !== '' && date2 !== ''){
            const startDate = new Date( date1 );
            const endDate = new Date( date2 );
            where = { 
                ...where, 
                createdAt: {
                    [Op.and]: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate.setDate( endDate.getDate() + 1 )
                    }
                }
            };
        }
        const accounts = await models.Account.findAll({
            where: { 
                customerId: userId,
                bankId,
            },
            attributes: ['id']
        });
        const accountsIds = accounts.map( a => a.dataValues.id );

        const totalRecords = await models.Record.count({ where: { accountId: {[Op.in]: accountsIds}, ...where } });

        const records = await models.Record.findAll({
            where: { accountId: {[Op.in]: accountsIds},  ...where },
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'amount', 'description', 'createdAt'],
            limit,
            offset,
            include: [
                { 
                    model: models.Account, 
                    as: 'account_ref',
                    attributes: ['numberAccount'], 
                    include: [{ 
                        model: models.Currency, as: 'currency',
                        attributes: ['symbol'] 
                    },{
                        model: models.Bank, as: 'bank', 
                        attributes: ['name']
                    }]
                },
                { model: models.Category, as: 'category_ref' }
            ]
        });
        return { records, totalPages: Math.ceil(totalRecords / limit) };
    }

    async getRecordsByAccount( accountId, limit = 10, offset = 0, date1 = '', date2 = '' ){

        let where = { accountId };

        if (date1 !== '' && date2 !== ''){
            const startDate = new Date( date1 );
            const endDate = new Date( date2 );
            where = { 
                ...where, 
                createdAt: {
                    [Op.and]: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate.setDate( endDate.getDate() + 1 )
                    }
                }
            };
        }

        const totalRecords = await models.Record.count({ where: where });
        const records = await models.Record.findAll({
            where: where,
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'amount', 'description', 'createdAt'],
            limit,
            offset,
            include: [
                { 
                    model: models.Account, 
                    as: 'account_ref',
                    attributes: ['numberAccount'], 
                    include: [{ 
                        model: models.Currency, as: 'currency',
                        attributes: ['symbol'] 
                    },{
                        model: models.Bank, as: 'bank', 
                        attributes: ['name']
                    }]
                },
                { model: models.Category, as: 'category_ref' }
            ]
        });
        return { records, totalPages: Math.ceil(totalRecords / limit) };
    }

    async getRecordsByUser( userId, limit = 10, offset = 0, date1 = '', date2 = '' ){
       
        let where = { userId };

        if (date1 !== '' && date2 !== ''){
            const startDate = new Date( date1 );
            const endDate = new Date( date2 );
            where = { 
                ...where, 
                createdAt: {
                    [Op.and]: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate.setDate( endDate.getDate() + 1 )
                    }
                }
            };
        }

        const totalRecords = await models.Record.count({ 
            where: where
        });

        const records = await models.Record.findAll({
            where: where,
            order: [['createdAt', 'DESC']],
            attributes: ['id', 'amount', 'description', 'createdAt'],
            limit,
            offset,
            include: [
                { 
                    model: models.Account, 
                    as: 'account_ref',
                    attributes: ['numberAccount'], 
                    include: [{ 
                        model: models.Currency, as: 'currency',
                        attributes: ['symbol'] 
                    },{
                        model: models.Bank, as: 'bank', 
                        attributes: ['name']
                    }]
                },
                { model: models.Category, as: 'category_ref' }
            ]
        });
        return { records, totalPages: Math.ceil(totalRecords / limit) };
    }

    async newTransfer( data ){
      const transaction = await sequelize.transaction();

      try {
        const destinationAccount = await models.Account.findOne({ 
            where: { 
                numberAccount: `${data.destinationNumberAccount}`,
                bankId: data.bankId
            }, include: [{ model: models.Currency, as: 'currency' }]
        }, { transaction });

        if( !destinationAccount || destinationAccount.dataValues.bankId.toString() !== data.bankId ){
            throw new ExceptionMessage(`Destination account with number: ${data.destinationNumberAccount} not exists in the bank choosed.`, `Destination account was not found.`) 
        };

        const sourceAccount = await models.Account.findOne({
            where: {
                id: data.sourceAccountId,
                customerId: data.customerId 
            }, include: [{ model: models.Currency, as: 'currency' }]
        }, { transaction });

        if( !sourceAccount ){
            throw new ExceptionMessage(`Source account with id: ${dataRecord.accountId}`, ` was not found.`) 
        };

        if( sourceAccount.id === destinationAccount.id ){
            throw new ExceptionMessage(`Can not transfert to the same account.`) 
        }

        if( ! (sourceAccount.dataValues.balance >= data.amount) ){
            throw new ExceptionMessage(`The source account does not have sufficient funds.`) 
        }

        const { newSourceBalance, newDestinationBalance, exchangeRate } = this.calculateNewBalances( sourceAccount, destinationAccount, data.amount );
        await sourceAccount.update({ balance: newSourceBalance }, { transaction });
        await destinationAccount.update({ balance: newDestinationBalance }, { transaction });

        const debitCategory = await models.Category.findOne({ where: { name: 'Debit Transfer' } }, { transaction });
        const creditCategory = await models.Category.findOne({ where: { name: 'Credit Transfer' } }, { transaction });
        const recordType = await models.RecordType.findOne({ where: { name: 'Transfer' } }, { transaction });

        const expenseRecord = {
            userId: sourceAccount.customerId,
            accountId: sourceAccount.id,
            categoryId: debitCategory.id,
            amount: data.amount,
            description: data.description,
            createdAt: new Date(),
            recordTypeId: recordType.id
        };

        await models.Record.create(expenseRecord, { transaction });

        const incomeRecord = {
            userId: destinationAccount.customerId,
            accountId: destinationAccount.id,
            categoryId: creditCategory.id,
            amount: Number(data.amount)*exchangeRate,
            description: `Transfer from account ${sourceAccount.numberAccount}`,
            createdAt: new Date(),
            recordTypeId: recordType.id
        };

        await models.Record.create(incomeRecord, { transaction });
        await transaction.commit();
        return {
            ok: true,
            exchangeRate,
            message: 'Transfer was successful.',
            transfer: expenseRecord,
        };

      } catch (error) {
        await transaction.rollback();
        throw error;
      }

    }

    async getTypesRecords(){
        const types = await models.RecordType.findAll();
        return types;
    }

    async findByProp( prop, value, transaction ){
        const record = await models.Record.findOne({
            where: { [prop]: value }
        })

        return record;
    }

    calculateNewBalances( sourceAccount, destinationAccount, amount ){
        const newSourceBalance = Number(sourceAccount.dataValues.balance) - Number(amount);
       
        const sourceCurrency = sourceAccount.dataValues.currency.code;
        const destinationCurrency = destinationAccount.dataValues.currency.dataValues.code;

        if( sourceCurrency === destinationCurrency ){
            const newDestinationBalance = Number(destinationAccount.dataValues.balance) + Number(amount);
            const exchangeRate = 1;
            return { newSourceBalance, newDestinationBalance, exchangeRate };
        }else{
            const exchangeRate = Number(exchanges[`${sourceCurrency}-${destinationCurrency}`]);
            console.log(`/////////////////EXCHANRGE RATE////////////////////// ${sourceCurrency}-${destinationCurrency}`);
            console.log(exchangeRate);
            const newDestinationBalance = 
                Number(destinationAccount.dataValues.balance) 
                + (Number(amount) * exchangeRate) ;
            return { newSourceBalance, newDestinationBalance, exchangeRate };
        }
    }

    recalculateBalanceFromCategory( category, actualBalance, amount ){
        const { type } = category.dataValues;
        const categoryIsPositive = categoryTypes.some( t => t.id === type && t.name === 'Income' );

        return (categoryIsPositive === true) 
            ?  Number(actualBalance) +  Number(amount) 
            :  Number(actualBalance) -  Number(amount);
    }

    async getRecordTypeName( recordTypeId ){
        const recordType = await models.RecordType.findOne({
            where: { id: recordTypeId }
        });
        return recordType.dataValues.name;
    }
}

module.exports = RecordService;
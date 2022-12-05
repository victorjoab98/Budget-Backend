const { Router } = require('express');
const validatorMiddleware = require('../middlewares/validator.middelware');
const { newRecordValidator, newTransferValidator } = require('../validators/record.validator');
const router = Router();

const RecordService = require('../services/record.service');
const recordService = new RecordService();

router.post(
    '/',
    validatorMiddleware(newRecordValidator, 'body'),
    async (req, res, next) => {
        try {
            const record = await recordService.createRecord(req.body);
            res.json(record);
        } catch (error) {
            next(error);
        }
    }       
);

router.post(
    '/transfer/',
    validatorMiddleware(newTransferValidator, 'body'),
    async (req, res, next) => {
        try {
            const response = await recordService.newTransfer(req.body);
            res.json(response);
        } catch (error) {
            next(error);
        }
    }       
);

router.get(
    '/types',
    async (req, res, next) => {
        try {
            const recordTypes = await recordService.getTypesRecords();
            res.json(recordTypes);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/user/:userId',
    async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { limit, offset, date1, date2 } = req.query;

            const records = await recordService.getRecordsByUser( userId, limit, offset, date1, date2 );
            res.json(records);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/account/:accountId',
    async (req, res, next) => {
        try {
            const { accountId } = req.params;
            const { limit, offset, date1, date2 } = req.query;
            const records = await recordService.getRecordsByAccount( accountId, limit, offset, date1, date2 );
            res.json(records);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/bank/:bankId/user/:userId',
    async (req, res, next) => {
        try {
            const { bankId, userId } = req.params;
            const { limit, offset, date1, date2 } = req.query;
            const records = await recordService.getRecordsByBank( userId, bankId, limit, offset, date1, date2 );
            res.json(records);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
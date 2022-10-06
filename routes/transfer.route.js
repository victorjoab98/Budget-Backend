const { Router } = require('express');
const TransferService = require('../services/transfers.service');

const router = Router();
const transferService = new TransferService();

router.post(
    '/',
    async (req, res, next) => {
        try {
            const transferData = req.body;
            const newTransfer = await transferService.registerTransfer(transferData);
            res.json(newTransfer);
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;
const { Router } = require('express');
const AuthService = require('../services/auth.service');

const router = Router();

const authService = new AuthService();

router.post(
    '/login',
    async (req, res, next) => {
        try{
            const user = await authService.login(req.body);
            res.json(user);
        }catch( error ){
            next(error);
        }
    }
);

module.exports = router;
const {Router} = require('express');
const CategoryService = require('../services/category.service');
const router = Router();

const categoryService = new CategoryService();

router.get(
    '/get/all', 
    async (req, res, next) => {
        try {
            const categories = await categoryService.getCategories();
            res.json(categories);
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router;
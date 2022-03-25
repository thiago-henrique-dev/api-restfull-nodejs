const express = require('express');
const router = express.Router()
const login = require('../middleware/login')

const categoriesContollers = require('../controllers/category-controllers');

router.get('/', categoriesContollers.getCategories)
router.post('/', categoriesContollers.postCategories)
router.put('/:categoryId', categoriesContollers.putCategories)
router.delete('/:categoryId', categoriesContollers.deleteCategories)
router.get('/:categoryId', categoriesContollers.getOneCategories)




module.exports = router
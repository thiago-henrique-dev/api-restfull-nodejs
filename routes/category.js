const express = require('express');
const router = express.Router()
const login = require('../middleware/login')

const categoriesContollers = require('../controllers/category-controllers');

router.get('/', categoriesContollers.getCategories)
router.post('/', categoriesContollers.postCategories)
router.put('/', categoriesContollers.putCategories)



module.exports = router
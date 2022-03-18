const express = require('express')
const router = express.Router();
const login = require('../middleware/login');

const imageController = require('../controllers/image-controllers')

router.delete('/:imageId', login.mandatory, imageController.deleteImage)

module.exports = router
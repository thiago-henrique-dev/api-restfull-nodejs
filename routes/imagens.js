const express = require('express')
const router = express.Router();
const login = require('../middleware/login');

const ImagensControllers = require('../controllers/imagens-controllers')

router.delete('/:id_imagem', login.obrigatorio, ImagensControllers.deleteImagem)

module.exports = router
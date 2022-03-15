const express = require('express');
const router = express.Router()
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt'); //biblioteca para criptografar a senha 
const jwt = require('jsonwebtoken');
const UsuariosControllers = require('../controllers/usuarios-controllers')

router.post('/cadastro', UsuariosControllers.cadastrarUsuario) 
router.post('/login', UsuariosControllers.loginUsuario)

module.exports = router;
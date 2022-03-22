const express = require('express');
const router = express.Router()
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt'); //biblioteca para criptografar a senha 
const jwt = require('jsonwebtoken');
const usersController = require('../controllers/users-controllers')

router.get('/users', usersController.getUsers)
router.post('/sign-up', usersController.createUser) 
router.post('/login', usersController.login)

module.exports = router;
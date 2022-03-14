const express = require('express');
const router = express.Router()
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt'); //biblioteca para criptografar a senha 

router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query('SELECT * FROM usuarios WHERE email = ?', [req.body.email], (error, results, fields) => {
            if(error){ return res.status(500).send({error: error})}
            if(results.length > 0){
                res.status(409).send({ mensagem: "Usuario ja cadastrado"})
            } else {
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if(errBcrypt){ return res.status(500).send({ error: errBcrypt }) }
                        conn.query(`
                            INSERT INTO usuarios (email, senha) VALUES (?,?);
                        `, [req.body.email, hash],
                                (error, result, fields) => {
                                    conn.release()
                                    if(error){return res.status(500).send({ error: error })}
                                        const response = {
                                            mensagem: "Usuario criado com sucesso!",
                                            usuarioCriado: {
                                                id_usuario: result.insertId,
                                                email: req.body.email
                                            }
                                        } 
                                        return res.status(201).send(response)
                     })
                })

            }
        })
    })
})


module.exports = router;
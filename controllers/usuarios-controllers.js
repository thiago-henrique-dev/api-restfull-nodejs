const mysql = require('../mysql')
const mysql2 = require('../mysql').pool

const express = require('express');
const bcrypt = require('bcrypt'); //biblioteca para criptografar a senha 
const jwt = require('jsonwebtoken');

exports.cadastrarUsuario = async (req, res, next) => {
        try {
            const query = `SELECT * FROM usuarios WHERE email = ?`
            const result = await mysql.execute(query, [req.body.email])
            
            if(result.length > 0){ 
                res.status(500).send({mensagem: "Usuario ja cadastrado"})
            } else {
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if(errBcrypt){return res.status(500).send({ error: errBcrypt})}
                    const queryUser = `INSERT INTO usuarios (email, senha) VALUES (?,?);`
                    const result =  mysql.execute(queryUser, [req.body.email, hash])
                            const response = {
                                msg: "Usuario cadastrado com sucesso"
                            }
                            return res.status(200).send(response)
                })
            }
            
        } catch (error) {
                return res.status(500).send({error:error})
        }
}


exports.loginUsuario = async (req, res, next) => {
    try {
        const query = `SELECT * FROM usuarios WHERE email = ?`;
        const results = await mysql.execute(query, [req.body.email])
            if(results.length < 1){
                return res.status(401).send({ mensagem : "Falha na autenticacao"})
            } 
                bcrypt.compare(req.body.senha, results[0].senha, (err, sneha) => {
                    if(results){
                        const token = jwt.sign({
                            id_usuario: results[0].id_usuario,
                            email: results[0].email
                        },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            }
                        )
                            return res.status(200).send({
                                msg: "autenticado com sucesso",
                                token: token
                            })
                        }
                        return res.status(401).send({msg: "falha na autenticacao"})
                })



    } catch (error) {
        res.status(500).send({error:error})
    }
}


// exports.loginUsuario = (req, res, next) => {
//     mysql2.getConnection((error, conn) => {
//         if (error) { return res.status(500).send({ error: error }) }
//           const query = `SELECT * FROM usuarios WHERE email = ?`;
//                 conn.query(query,[req.body.email],(error, results, fields) => {
//                     conn.release();
//                        if (error) { return res.status(500).send({ error: error }) }
//                             if (results.length < 1) {
//                                 return res.status(401).send({ mensagem: 'Falha na autenticação' })
//             }
//                                       bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
//                                           if (err) {
//                                              return res.status(401).send({ mensagem: 'Falha na autenticação' })
//                             }
//                                                 if (result) {
//                                                      const token = jwt.sign({
//                                                           id_usuario: results[0].id_usuario,
//                                                              email: results[0].email
//                                                           },
//                                                               process.env.JWT_KEY,
//                                                             {
//                                                                 expiresIn: "1h"
//                                                             });
//                                                                 return res.status(200).send({
//                                                                     mensagem: 'Autenticado com sucesso',
//                                                                     token: token
//                                                                         });
//                                                                            }
//                                                                      return res.status(401).send({ mensagem: 'Falha na autenticação' })
//                                                         });
//                                                     });
//                                                 });
//                                             }

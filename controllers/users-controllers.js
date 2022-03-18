const mysql = require('../mysql')
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res, next) => {
    try {
        const query = `SELECT * FROM users WHERE email = ?`
        const result = await mysql.execute(query, [req.body.email])
        
        if(result.length > 0){ 
            res.status(500).send({message: "User already registered"})
        } else {
            bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
                if(errBcrypt){return res.status(500).send({ error: errBcrypt})}
                const queryUser = `INSERT INTO users (email, password) VALUES (?,?);`
                const result =  mysql.execute(queryUser, [req.body.email, hash])
                        const response = {
                            message: "User registered successfully"
                        }
                        return res.status(200).send(response)
            })
        }
        
    } catch (error) {
            return res.status(500).send({error:error})
    }
}


exports.login = async (req, res, next) => {
    try {
        const query = `SELECT * FROM users WHERE email = ?`;
        const results = await mysql.execute(query, [req.body.email])
            if(results.length < 1){
                return res.status(401).send({ message : "Authentication failed"})
            } 
                bcrypt.compare(req.body.senha, results[0].password, (err, hash) => {
                    if(results){
                        const token = jwt.sign({
                            id: results[0].userId,
                            email: results[0].email
                        },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            }
                        )
                            return res.status(200).send({
                                message: "Authentication sucessfull",
                                token: token
                            })
                        }
                        return res.status(401).send({message: "Authentication failed"})
                })



    } catch (error) {
        res.status(500).send({error:error})
    }
}



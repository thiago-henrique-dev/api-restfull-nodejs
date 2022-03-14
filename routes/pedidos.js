const express = require('express');
const router = express.Router()
const mysql = require('../mysql').pool;

//Retorna todos os pedidos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error:error})}
        conn.query(`SELECT pedidos.id_pedidos, 
                        pedidos.quantidades, 
                        produtos.id_produto, 
                        produtos.nome, 
                        produtos.preco from pedidos
                        INNER JOIN produtos
                        ON produtos.id_produto = pedidos.id_produto;
;`,
            (error, result, fields) => {
                if(error){ return res.status(500).send({eror:error})}
                    conn.release()
                        if(error){return res.status(500).send({error:error})}
                            const response = {
                                
                                pedidos: result.map(pedidos => {
                                    return {
                                        id_pedido: pedidos.id_pedidos,
                                        quantidade: pedidos.quantidade,
                                        produto: {
                                            id_produto: pedidos.id_produto,
                                            nome: pedidos.nome,
                                            preco: pedidos.preco
                                        },
                                        request:{
                                            tipo: "GET",
                                            descricao: `Retorna todos os pedidos`
                                        }
                                    }
                                })
                            }
                            return res.status(200).send(response)
            })
    })
});

//Inseri um pedido
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({error: error})}
        conn.query(
            `SELECT * FROM produtos WHERE id_produto = ?`, [req.body.id_produto], // VERIFICO SE TEM PRODUTO
                (error, result, fields) => {
                    if (error) {return res.status(500).send({error: error})}
                    if(result.length == 0){
                        return res.status(404).send({  // SE NAO TIVER PRODUTOS ELE RETORNA STATUS 404
                            mensagem: `Produto nao encontrado`
                        })
                    } // CASO TENHA PRODUTOS ELE NAO ENTRA NO IF.. E VAI DAR CONTINUIDADE PARA INSERIR O PEDIDO 
                    mysql.getConnection((error, conn) => {
                        if (error) {return res.status(500).send({error: error})}
                        conn.query('INSERT INTO pedidos (id_produto, quantidades) VALUES (?,?)',
                            [req.body.id_produto, req.body.quantidades],
                                (error, result, field) => {
                                    conn.release()
                                        if(error) { return res.status(500).send({ error: error})}
                                            const response = {
                                                mensagem: 'Pedido inserido com sucesso',
                                                produtoCriado: {
                                                    id_pedidos: req.params.id_pedidos,
                                                    id_produto: req.body.id_produto,
                                                    quantidade: req.body.quantidades,
                                                    request: {
                                                        tipo: 'GET',
                                                        descricao: 'Insere um pedido',
                                                        url: 'http://localhost:3000/pedidos'
                                                    }
                                                }
                                            }
                                            return res.status(201).send(response)
                                }
                        
                        )
                    })
                });
                
                //Retorna os dados de um pedido
                router.get('/:id_pedidos', (req, res, next) => {
                        mysql.getConnection((error, conn) => {
                            if(error) {return res.status(500).send({error: error})}
                                conn.query(
                                    `SELECT * FROM pedidos WHERE id_pedidos = ?;`,
                                    [req.params.id_pedidos],
                                        (error, result, field) => {
                                            if(result.length == 0){
                                                res.status(404).send({
                                                    mensagem: `Nao foi encontrado pedido com este ID`
                                                })
                                            }
                                                const response = {
                                                    pedido: {
                                                        id_pedidos: result[0].id_pedidos,
                                                        id_produto: result[0].id_produto,
                                                        quantidades: result[0].quantidades,
                                                        request: {
                                                            tipo: 'GET',
                                                            descricao: 'Retorna todos os pedidos',
                                                            url: 'http://localhost:3000/pedidos'
                                                        }
                                                    }
                                                }
                                                return res.status(200).send(response)
                
                                        }
                                )
                        })

          })
    })

     
})

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error: error})}
            conn.query(
                `DELETE FROM pedidos WHERE id_pedidos = ?`,
                    [req.body.id_pedidos],
                        (error, result, field) => {
                            conn.release();
                                if(error) {return res.status(500).send({error: error})}
                                    const response = {
                                        mensagem: `Pedido removido com sucesso`,
                                        request:{
                                            tipo: `DELETE`,
                                            descricao: `Deletando um pedido`,
                                            url: `http://localhost:3000/pedidos`,
                                            body: {
                                                id_produto: `Number`,
                                                quantidade: `Number`
                                            }
                                        }
                                    }
                                    return res.status(202).send(response)
                        }
            )
    })
})

module.exports = router;
const {query} = require("express")
const mysql = require(`../mysql`)


exports.getOrdersItens = async (req, res, next) => {
    try {
        const query = `SELECT   orderItem.orderId_item,
                                orderItem.id_order,
                                orderItem.productQt,
                                orderItem.orderVl,
                                orderItem.dt_date,
                                products.productId, 
                                 products.name, 
                                 products.productImage,
                                 products.price from orderItem
                                 INNER JOIN products
                                 ON products.productId = orderItem.productId;
                                `

        const result = await mysql.execute(query)
        const response = {
            ordersItens: result.map(orders => {
                return {
                    orderId_item: orders.orderId_item,
                    orderId: orders.orderId,
                    productQt: orders.productQt,
                    orderVl: orders.orderVl,
                    dt_date: orders.dt_date,
                    product: {
                        productId: orders.productId,
                        name: orders.name,
                        productImage: orders.productImage,
                        price: orders.price
                    }
                }
            })
        }
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send({error: error})
    }
}

exports.postOrdersItens = async (req, res, next) => {
    try {
        const queryProduct = 'SELECT * FROM products WHERE productId = ?'
        const resultProduct = await mysql.execute(queryProduct, [req.body.productId])
        if (resultProduct.length == 0) {
            return res.status(404).send({message: 'Produto não encontrado'});
        }
        const queryOrder = `INSERT INTO orderItem (orderId_item, id_order, productId, productQt, orderVl, dt_date) VALUES (?,?,?,?,?,?)`;
        const resultOrder = await mysql.execute(queryOrder, [
            req.params.orderId_item,
            req.body.id_order,
            req.body.productId,
            req.body.productQt,
            req.body.orderVl,
            req.body.dt_date
        ])  
        const response = {
            message: 'Pedido inserido com sucesso',
            createdOrder: {
                orderItem: req.body.orderId_item,
                orderId: resultOrder.insertId,
                productId: req.body.productId,
                quantity: req.body.productQt,
                orderVl: req.body.orderVl,
                dt_date: req.body.dt_date,
                request: {
                    type: 'POST',
                    description: 'Retorna todos os pedidos',
                    url: process.env.URL_API + 'ordersItens'
                }
            }
        }

        return res.status(200).send(response)

    } catch (error) {
        return res.status(500).send({error: error})
    }
}

exports.getOneOrderItens = async (req, res, next) => {
    try {
        const query = `SELECT * FROM orderItem WHERE orderId_item = ?`
        const result = await mysql.execute(query, [req.params.orderId_item])
            if(result.length == 0){
                return res.status(404).send({ message: "Nao encontrado"})
            }
            const response = {
                order: {
                    orderId_item: result[0].orderId_item,
                    orderId: result[0].orderId,
                    productId: result[0].productId,
                    productQt: result[0].productQt,
                    orderVl: result[0].orderVl,
                    dt_date: result[0].dt_date,
                    request: {
                        tipo: 'GET',
                        descricao: 'Return one orders',
                        url: 'http://localhost:3000/ordersItem/orderId_item'
                    }
                }
            }
            res.status(200).send(response)
    } catch (error) {
            res.status(500).send({error:error})
    }
}

exports.deleteOrdersItem = async (req, res, next) => {
   try {
    const query= `DELETE FROM orderItem WHERE orderId_item =?`
    const result = await mysql.execute(query, [req.params.orderId_item])
        const response = {
            mensagem: `orderItem removed`,
            request:{
                type: `DELETE`,
                descricao: `Deleting an order`,
                url: `http://localhost:3000/orders`
            }
        }
        return res.status(200).send(response)
   } catch (error) {
       return res.status(500).send({error:error})
   }
}


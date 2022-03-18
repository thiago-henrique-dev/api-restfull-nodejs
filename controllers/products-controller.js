const { compareSync } = require('bcrypt');
const mysql = require('../mysql');

exports.getProducts = async (req, res, next) => {
    try {
        const result = await mysql.execute("SELECT * FROM products;")
        const response = {
            quantity: result.length,
            products: result.map(prod => {
                return {
                    productId: prod.productId,
                    name: prod.nome,
                    price: prod.preco,
                    productImage: prod.image_produto,
                    request: {
                        type: 'GET',
                        description: 'Returns the specific details of a product',
                        url: 'http://localhost:3000/products/' + prod.productId
                    }
                }
            })
        }
        return res.status(200).send(response)


    } catch (error) {
        return res.status(500).send({error: error})
    }
}


exports.productPost = async (req, res, next) => {
    try {
        const query = 'INSERT INTO products (name, price, productImage) VALUES (?,?,?)';
        const result = await mysql.execute(query, [
            req.body.name,
            req.body.price,
            req.file.path
        ]);

        const response = {
            mensagem: 'product inserted successfully',
            produtoCriado: {
                productId: result.insertId,
                name: req.body.name,
                price: req.body.price,
                productImage: req.file.path,
                request: {
                    type: 'GET',
                    description: 'Return specific products',
                    url: process.env.URL_API + 'products'
                }
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.getOneProduct = async (req, res, next) => {
   try {
       console.log(req.params.userId); 
       const query = `SELECT * FROM products WHERE productId = ?`;
       const result = await mysql.execute(query, [
           req.params.productId
       ])
        console.log(result)
       
            if (result == 0){
                return res.status(404).send({
                    mensagem:  "No product found for this ID"
                })
            }
            const response = {
                
                products: {
                    productId: result[0].productId,
                    name: result[0].name,
                    price: result[0].price,
                    productImage: result[0].productImage,
                    request: {
                        type: 'GET',
                        description: 'Return all products',
                        url: process.env.URL_API + `produtos`
                    }
                }
            }
                console.log(response)
                res.status(200).send({response})
   } catch (error) {
            return res.status(500).send({ error: error })
   }
};
exports.updateProducts = async(req, res, next) => {
        try {
            const query = `UPDATE products SET name = ?, price = ? WHERE productId = ?`
            const result = await mysql.execute(query, [
                req.body.name, 
                req.body.price,
                req.body.productId
            ])
            const response = {
                mensagem: 'Product successfully updated',
                produtoAtualizado: {
                    productId: req.body.productId,
                    name: req.body.name,
                    price: req.body.price,
                    request: {
                        type: 'GET',
                        description: 'Returns the details of a specific product',
                        url: 'http://localhost:3000/produtos/' + req.body.productId
                    }
                }
            }
            return res.status(202).send(response)
        } catch (error) {
            return res.status(500).send({error:error})
        }
            
            
};
exports.deleteProducts = async (req, res, next) => {

        try {
            const query = `DELETE FROM products WHERE productId = ?`;
            await mysql.execute(query, [req.body.productId]);

            const response = {
                message: 'Product removed successfully',
                request: {
                    type: 'POST',
                    description: 'insert a product',
                    url: process.env.URL_API + 'product',
                    body: {
                        nome: 'String',
                        preco: 'Number'
                    }
                }
            }
            return res.status(202).send(response);
            } catch (error) {
            return res.status(500).send({error:error})
        }

};

exports.postImagem = async (req, res, next) => {
    try {
        const query = 'INSERT INTO productImage (id_produto, caminho) VALUES (?,?)';
        const result = await mysql.execute(query, [
            req.params.productImage,
            req.file.path
        ]);

          console.log(result);
    
        const response = {
            message: 'Image inserted successfully',
            createImage: {
                productiD: req.params.productId,
                imageId: result.insertId,
                imageProduct: req.file.path,
                request: {
                    tipo: 'GET',
                    descricao: 'Return all images',
                    url: process.env.URL_API + 'product/' + req.params.productId + '/image'
                }
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};
    exports.getImagens = async (req, res, next) => {
        try {
            const query = 'SELECT * FROM productImage WHERE productId = ?'
            const result = await mysql.execute(query, [req.params.productId])
            const response = {
                quantity: result.length,
                image: result.map(img => {
                   return {
                       id_produto: parseInt(req.params.productId),
                       id_imagem: img.productId,
                       caminho: img.imageId,
                       imagem_produto: img.imagem_produto,
                     
                   }
                })
            }
                   return res.status(200).send(response)
        } catch (error) {
                   return res.status(500).send({ error: error })
        }
    }
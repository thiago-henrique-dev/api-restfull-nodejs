const { compareSync } = require('bcrypt');
const mysql = require('../mysql');

exports.getProducts = async (req, res, next) => {
    try {
       
        const query = `SELECT * FROM products`;
        const result = await mysql.execute(query)
     
        return res.status(200).send(result)


    } catch (error) {
        return res.status(500).send({error: error})
    }
}


exports.productPost = async (req, res, next) => {

    console.log(`req: `,req.body.price)

    try {
        const query = 'INSERT INTO products (name, price, categoryId, productImage) VALUES (?,?,?,?)';
        const result = await mysql.execute(query, [
            req.body.name,
            req.body.price,
            req.body.categoryId,
            req.body.productImage,
        ]);

        
        return res.status(200).send(result);
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
       
            // if (result == 0){
            //     return res.status(404).send({
            //         mensagem:  "No product found for this ID!!!!"
            //     })
            // }
         
                res.status(200).send({result})
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
                req.params.productId
            ])
                   
         
            return res.status(200).send(result)
        } catch (error) {
            return res.status(500).send({error:error})
        }
            
            
};
exports.deleteProducts = async (req, res, next) => {

        try {
            const query = `DELETE FROM products WHERE productId = ?`;
             const result = await mysql.execute(query, [req.params.productId]);

            
            return res.status(200).send(result);
            } catch (error) {
            return res.status(500).send({error:error})
        }

};

exports.postImagem = async (req, res, next) => {
    try {
        const query = 'INSERT INTO productImages (productId, path) VALUES (?,?)';
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
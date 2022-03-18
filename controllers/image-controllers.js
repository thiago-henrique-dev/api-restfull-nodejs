const mysql = require('../mysql')

exports.deleteImage = async (req, res, next) => {
    try {
        const query = `DELETE FROM productImages WHERE imageId = ?`;
        await mysql.execute(query, [req.params.imageId])
        console.log(req.params.imageId);
            
         const response = {
             mensagem: "Image removed successfully",
             request: {
                 tipo: "POST",
                 descricao: "Insert a product",
                 url: process.env.URL_API + `product/` + req.body.id_produto + `/image`,
                 body: {
                     id_produto: 'Number',
                     imagem_produto: 'File'
                 }
             }
         }
           return res.status(202).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}
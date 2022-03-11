const express = require('express');
const router = express.Router()

//Retorna todos os produtos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna todos os produtos'
    })
});

//Inseri um produto
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Inseri um produto'
    })
});

//Retorna os dados de um produto
router.get('/:id_produto', (req, res, next) => {
        const id = req.params.id_produto

        if(id === 'especial'){
             res.status(200).send({
            mensagem: 'Voce descobriu um ID especial',
            id: id
        })
        } else {
            res.status(200).send({
                mensagem: "Voce passou um ID"
            })
        }
})

//Altera um produto
router.patch('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "Usando o patch dentro da rota de produtos"
    })
})

//Exclui um produto
router.delete('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o DELETE dentro da rota de produtos'
    })
})

module.exports = router;
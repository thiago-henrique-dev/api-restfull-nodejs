const express = require('express');
const router = express.Router()

const PedidosController = require('../controllers/pedidos-controllers')

router.get('/', PedidosController.getPedidos)
router.post('/', PedidosController.postPedidos)
router.get('/:id_pedidos', PedidosController.getUmPedido )
router.delete('/', PedidosController.deletarPedido)

module.exports = router;
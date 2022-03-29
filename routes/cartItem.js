const express = require('express');
const router = express.Router()
const ordersItemControllers = require(`../controllers/ordersItens-controller`)

router.get('/', ordersItemControllers.getOrdersItens)
router.post('/', ordersItemControllers.postOrdersItens)
router.get('/:orderId_item', ordersItemControllers.getOneOrderItens)
router.delete('/:orderId_item', ordersItemControllers.deleteOrdersItem)

module.exports = router
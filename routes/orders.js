const express = require('express');
const router = express.Router()

const ordersControllers = require('../controllers/orders-controllers')

router.get('/', ordersControllers.getOrders)
router.post('/', ordersControllers.postOrders)
router.get('/:orderId', ordersControllers.getOrderDetail )
router.delete('/', ordersControllers.deleteOrder)

module.exports = router;
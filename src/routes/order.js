const express = require('express');
const router = express.Router();
const {findUserById, addOrderToUserHistory} =  require('../controllers/user');
const {requireSignIn, isAuth, isAdmin} =  require('../controllers/auth');
const {create, listOrders, getStatusValues, findOrderById, updateOrderStatus} =  require('../controllers/order');
const {decreaseProductQuantity} =  require('../controllers/product');

router.post('/order/create/:userId', requireSignIn, isAuth, addOrderToUserHistory, decreaseProductQuantity, create);
router.get('/order/list/:userId', requireSignIn, isAuth, isAdmin, listOrders);
router.get('/order/status-values/:userId', requireSignIn, isAuth, isAdmin, getStatusValues);
router.put('/order/:orderId/status/:userId', requireSignIn, isAuth, isAdmin, updateOrderStatus);

router.param('userId', findUserById);
router.param('orderId', findOrderById);

module.exports = router;
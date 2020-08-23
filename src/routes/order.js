const express = require('express');
const router = express.Router();
const {findUserById, addOrderToUserHistory} =  require('../controllers/user');
const {requireSignIn, isAuth, isAdmin} =  require('../controllers/auth');
const {create, listOrders, getStatusValues} =  require('../controllers/order');
const {decreaseProductQuantity} =  require('../controllers/product');

router.post('/order/create/:userId', requireSignIn, isAuth, addOrderToUserHistory, decreaseProductQuantity, create);
router.get('/order/list/:userId', requireSignIn, isAuth, isAdmin, listOrders);
router.get('/order/status-values/:userId', requireSignIn, isAuth, isAdmin, getStatusValues);

router.param('userId', findUserById);

module.exports = router;
const express = require('express');
const router = express.Router();
const {findUserById} =  require('../controllers/user');
const {requireSignIn, isAuth} =  require('../controllers/auth');
const {create} =  require('../controllers/order');

router.post('/order/create/:userId', requireSignIn, isAuth, create);

router.param('userId', findUserById);

module.exports = router;
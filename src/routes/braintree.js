const express = require('express');
const router = express.Router();
const {generateToken, processPayment} =  require('../controllers/braintree');
const {findUserById} =  require('../controllers/user');
const {requireSignIn, isAuth} =  require('../controllers/auth');

router.get('/braintree/getToken/:userId', requireSignIn, isAuth, generateToken);
router.post('/braintree/payment/:userId', requireSignIn, isAuth, processPayment);
router.param('userId', findUserById);

module.exports = router;
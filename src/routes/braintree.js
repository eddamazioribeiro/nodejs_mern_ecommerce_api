const express = require('express');
const router = express.Router();
const {generateToken} =  require('../controllers/braintree');
const {findUserById} =  require('../controllers/user');
const {requireSignIn, isAuth} =  require('../controllers/auth');

router.get('/braintree/getToken/:userId', requireSignIn, isAuth, generateToken);
router.param('userId', findUserById);

module.exports = router;
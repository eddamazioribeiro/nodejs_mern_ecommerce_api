const express = require('express');
const router = express.Router();
const {create, findProductById, read} = require('../controllers/product');
const {findUserById} =  require('../controllers/user');
const {requireSignIn, isAuth, isAdmin} =  require('../controllers/auth');

router.post('/product/create/:userId', requireSignIn, isAuth, isAdmin, create);
router.get('/product/:productId', read);

router.param('productId', findProductById);
router.param('userId', findUserById);

module.exports = router;
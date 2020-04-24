const express = require('express');
const router = express.Router();
const {create, remove, removeAllProducts, read, findProductById} = require('../controllers/product');
const {findUserById} =  require('../controllers/user');
const {requireSignIn, isAuth, isAdmin} =  require('../controllers/auth');

router.post('/product/create/:userId', requireSignIn, isAuth, isAdmin, create);
router.get('/product/:productId', read);
router.delete('/product/destroy/:userId', requireSignIn, isAuth, isAdmin, removeAllProducts);
router.delete('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, remove);


router.param('productId', findProductById);
router.param('userId', findUserById);

module.exports = router;
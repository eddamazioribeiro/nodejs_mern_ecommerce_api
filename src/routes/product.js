const express = require('express');
const router = express.Router();
const {create} = require('../controllers/product');
const {findUserById} =  require('../controllers/user');
const {requireSignIn, isAuth, isAdmin} =  require('../controllers/auth');

router.post('/product/create/:userId', requireSignIn, isAuth, isAdmin, create);
router.param('userId', findUserById);

module.exports = router;
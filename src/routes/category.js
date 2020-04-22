const express = require('express');
const router = express.Router();
const {create} = require('../controllers/category');
const {findUserById} =  require('../controllers/user');
const {requireSignIn, isAuth, isAdmin} =  require('../controllers/auth');

router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, create);
router.param('userId', findUserById);

module.exports = router;
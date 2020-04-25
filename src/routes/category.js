const express = require('express');
const router = express.Router();
const {create, read, findCategoryById} = require('../controllers/category');
const {findUserById} =  require('../controllers/user');
const {requireSignIn, isAuth, isAdmin} =  require('../controllers/auth');

router.get('/category/read/:categoryId', read);
router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, create);

router.param('categoryId', findCategoryById);
router.param('userId', findUserById);

module.exports = router;
const express = require('express');
const router = express.Router();
const {create, read, list, update, remove, findCategoryById} = require('../controllers/category');
const {findUserById} =  require('../controllers/user');
const {requireSignIn, isAuth, isAdmin} =  require('../controllers/auth');

router.get('/category/read/:categoryId', read);
router.get('/categories', list);
router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, create);
router.put('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, remove);

router.param('categoryId', findCategoryById);
router.param('userId', findUserById);

module.exports = router;
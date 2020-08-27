const express = require('express');
const router = express.Router();
const {findUserById, read, update, purchaseHistory} =  require('../controllers/user');
const {requireSignIn, isAuth, isAdmin} =  require('../controllers/auth');

router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});
router.param('userId', findUserById);
router.get('/user/:userId', requireSignIn, isAuth, read);
router.put('/user/:userId', requireSignIn, isAuth, update);
router.get('/orders/by/user/:userId', requireSignIn, isAuth, purchaseHistory);


module.exports = router;
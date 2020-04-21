const express = require('express');
const router = express.Router();
const {findUserById} =  require('../controllers/user');
const {requireSignIn} =  require('../controllers/auth');

router.get('/secret/:userId', requireSignIn, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.param('userId', findUserById);

module.exports = router;
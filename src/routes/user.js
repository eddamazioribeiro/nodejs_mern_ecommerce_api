const express = require('express');
const router = express.Router();
const {signUp, signIn, signOut, requireSignIn} = require('../controllers/user');
const {userSignUpValidator} = require('../validators');

router.post('/signup', userSignUpValidator, signUp);
router.post('/signin', signIn);
router.get('/signout', signOut);

// router.get('/test', requireSignIn, (req, res) => {
//     res.send('OK!');
// });

module.exports = router;
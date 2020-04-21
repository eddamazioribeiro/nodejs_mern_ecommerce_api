const express = require('express');
const router = express.Router();
const {signUp, signIn, signOut, requireSignIn} = require('../controllers/auth');
const {userSignUpValidator} = require('../validators');

router.post('/signup', userSignUpValidator, signUp);
router.post('/signin', signIn);
router.get('/signout', signOut);

module.exports = router;
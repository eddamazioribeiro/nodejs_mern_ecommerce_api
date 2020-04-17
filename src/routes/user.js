const express = require('express');
const router = express.Router();
const {signUp, signIn} = require('../controllers/user');
const {userSignUpValidator} = require('../validators');

router.post('/signup', userSignUpValidator, signUp);
router.post('/singin', signIn);

module.exports = router;
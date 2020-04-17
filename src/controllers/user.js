const jwt = require('jsonwebtoken');
const expressJswt = require('express-jwt');
const User = require('../models/user');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.signUp = (req, res) => {
    const user = new User(req.body);

    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: errorHandler(err)
            });
        }

        user.salt = undefined;
        user.hashed_password = undefined;

        res.json({
            user
        });
    });
};

exports.signIn = (req, res) => {
    const {email, password} = req.body;

    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found. Please, signup'
            });
        } else {

            if(!user.authenticate(password)) {
                return res.status(401).json({
                    error: "Email and password doesn't match."
                });
            }

            const token = jwt.sign({_id: user.id}, process.env.JWT_SECRET);

            res.cookie('t', token, {expire: new Date() + 9999})

            const {_id, name, email, role} = user;
            
            return res.json({token: token, user: {
                _id,
                email,
                name,
                role
            }});
        }
    })
};
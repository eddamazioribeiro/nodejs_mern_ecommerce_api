const User = require('../models/user');

exports.findUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        } else {
            req.profile = user;
            next();
        }
    });
};
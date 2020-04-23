const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const bodyParser = require('body-parser');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded' + err
            });
        } else {
            let product = new Product(fields);
            let photo = files.photo;

            if (photo) {
                product.photo.data = fs.readFileSync(photo.path);
                product.photo.contentType = photo.type;
            }

            product.save((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                } else {
                    res.json(data);
                }
            });
        }
    })
};
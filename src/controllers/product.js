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
            let { name, description, price, category, quantity, shipping } = fields;
            let photo = files.photo;

            // validations
            if (photo) {
                if (files.photo.size > 1000000) {
                    return res.status(400).json({
                        error: 'Image should be less than 1mb in size'
                    });
                }

                product.photo.data = fs.readFileSync(photo.path);
                product.photo.contentType = photo.type;
            }

            if (!name || !description || !price || !category || !quantity || !shipping) {
                return res.status(400).json({
                    error: 'All fields are required'
                });
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

exports.findProductById = (req, res, next, id) => {
    Product.findById(id)
        .exec((err, product) => {
            if (err || !product) {
                res.status(400).json({
                    error: `Product with ID ${id} not found`
                })
            } else {
                req.product = product;
            }

            next();
        });
};

exports.read = (req, res) => {
    let product = req.product;

    if (product) {
        product.photo = undefined;

        return res.json({
            product
        });
    }
};

exports.remove = (req, res) => {
    let product = req.product;

    product.remove((err, deletedProduct) => {
        if (err) {
            res.status(400).json({
                error: errorHandler(err)
            })
        } else {
            res.json({
                // deletedProduct,
                message: 'Product successfully deleted'
            })
        }
    });
};

// just for testing purpose
exports.removeAllProducts = (req, res) => {
    Product.deleteMany({}, (err) => {

        if (err) {
            res.status(400).json({
                error: errorHandler(err)
            });
        } else {
            res.status(200).json({
                message: 'All products were successfully deleted'
            })
        }
    })
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded' + err
            });
        } else {
            let product = req.product;
            let { name, description, price, category, quantity, shipping } = fields;
            let photo = files.photo;

            product = _.extend(product, fields);

            // validations
            if (photo) {
                if (files.photo.size > 1000000) {
                    return res.status(400).json({
                        error: 'Image should be less than 1mb in size'
                    });
                }

                product.photo.data = fs.readFileSync(photo.path);
                product.photo.contentType = photo.type;
            }

            if (!name || !description || !price || !category || !quantity || !shipping) {
                return res.status(400).json({
                    error: 'All files are required'
                });
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

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                })
            } else {
                res.send(products);
            }
        })
};

exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find({
        // this means 'except this product on request' (reference product)
        _id: {$ne: req.product},
        category: req.product.category
    })
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            } else {
                res.json(products);
            }
        });
};

exports.listCategories = (req, res) => {
    Product.distinct('category', {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: 'Categories not found'
            });
        } else {
            res.json(categories);
        }
    });
};

exports.listBySearch = (req, res) => {
    var order = req.body.order ? req.body.order : 'desc';
    var sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    var limit = req.body.limit ? parseInt(req.body.limit) : 100;
    var skip = parseInt(req.body.skip);
    var findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) { 
            if (key === 'price') {
                findArgs[key] = {
                    // gte - greater than price [0-10]
                    // lte - less than
                    // MongoDB notation
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    console.log('findArgs:', findArgs);

    Product.find(findArgs)
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            } else {
                res.json({
                    size: data.length,
                    products: data
                });
            }
        })
};

exports.getPhoto = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType)

        return res.send(req.product.photo.data);
    }

    next();
};
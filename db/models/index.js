'use strict';

var UserMeta = require('./user'),
    connection = require('../index.js');

const User = connection.define('users', UserMeta.attributes, UserMeta.options);

const Product = require('./product');
const Review = require('./review');

Product.hasMany(Review);
Review.belongsTo(Product);

module.exports = {Product, Review, User};

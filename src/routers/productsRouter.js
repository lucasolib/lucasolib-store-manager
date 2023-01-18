const express = require('express');
const { productsControllers } = require('../controllers');

const routerProduct = express.Router();

routerProduct.get('/', productsControllers.listProducts);

routerProduct.get('/:id', productsControllers.getProductById);

module.exports = routerProduct;
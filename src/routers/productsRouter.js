const express = require('express');
const { productsControllers } = require('../controllers');
const validateNewProduct = require('../middlewares/validateNewProducts');

const routerProduct = express.Router();

routerProduct.get('/', productsControllers.listProducts);

routerProduct.get('/:id', productsControllers.getProductById);

routerProduct.post('/', validateNewProduct, productsControllers.createProduct);

routerProduct.put('/:id', validateNewProduct, productsControllers.updateProduct);

module.exports = routerProduct;
const express = require('express');
const { productsControllers } = require('../controllers');
const validateNewProduct = require('../middlewares/validateNewProducts');

const routerProduct = express.Router();

routerProduct.get('/', productsControllers.listProducts);

routerProduct.get('/search', productsControllers.findByQuery);

routerProduct.get('/:id', productsControllers.getProductById);

routerProduct.post('/', validateNewProduct, productsControllers.createProduct);

routerProduct.put('/:id', validateNewProduct, productsControllers.updateProduct);

routerProduct.delete('/:id', productsControllers.deleteProduct);

module.exports = routerProduct;
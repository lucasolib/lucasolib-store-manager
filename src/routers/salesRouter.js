const express = require('express');
const { salesControllers } = require('../controllers');

const routerSale = express.Router();

routerSale.post('/', salesControllers.createSale);

routerSale.get('/', salesControllers.listAllSales);

routerSale.get('/:id', salesControllers.getSaleById);

module.exports = routerSale;

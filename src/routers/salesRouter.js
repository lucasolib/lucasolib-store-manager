const express = require('express');
const { salesControllers } = require('../controllers');

const routerSale = express.Router();

routerSale.post('/', salesControllers.createSale);

routerSale.get('/', salesControllers.listAllSales);

routerSale.get('/:id', salesControllers.getSaleById);

routerSale.delete('/:id', salesControllers.deleteSale);

routerSale.put('/:id', salesControllers.updateSale);

module.exports = routerSale;

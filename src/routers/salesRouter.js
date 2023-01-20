const express = require('express');
const { salesControllers } = require('../controllers');

const routerSale = express.Router();

routerSale.post('/', salesControllers.createSale);

module.exports = routerSale;

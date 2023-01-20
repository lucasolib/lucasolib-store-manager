const { salesModels, productsModels } = require('../models');
const schema = require('./validations/validationsInputValue');

const registerSale = async (sale) => {
  const error = schema.validateNewSale(sale);
  if (error.type) return error;
  const allProducts = await productsModels.findAll();
  const allProductsId = allProducts.map(({ id }) => +id);
  if (sale.some(({ productId }) => !allProductsId.includes(productId))) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  } const newSaleId = await salesModels.registerSale(sale);
  const newSale = {
    id: newSaleId,
    itemsSold: sale,
  };
  return { type: null, message: newSale };
};

module.exports = {
  registerSale,
};

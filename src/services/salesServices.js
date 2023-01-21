const { salesModels, productsModels } = require('../models');
const schema = require('./validations/validationsInputValue');

const registerSale = async (sale) => {
  const allProducts = await productsModels.findAll();
  const error = schema.validateNewSale(sale, allProducts);
  if (error.type) return error;
  const newSaleId = await salesModels.registerSale(sale);
  const newSale = {
    id: newSaleId,
    itemsSold: sale,
  };
  return { type: null, message: newSale };
};

const findAllSales = async () => {
  const allSales = await salesModels.findAllSales();
  return { type: null, message: allSales };
};

const findSaleById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;
  const sale = await salesModels.findSaleById(saleId);
  if (!sale || sale.length === 0) { return { type: 'SALE_NOT_FOUND', message: 'Sale not found' }; }
  return { type: null, message: sale };
};

const deleteSale = async (saleId) => {
  const sale = await salesModels.findSaleById(saleId);
  if (!sale || sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  await salesModels.deleteSale(saleId);
  return { type: null, message: sale };
};

const updateSale = async (id, sales) => {
  const allProducts = await productsModels.findAll();
  const sale = await salesModels.findAllSales();
  const error = schema.validateUptadeSale(
    sales,
    allProducts,
    sale,
    id,
  );
  if (error.type) return error;
  await salesModels.updateSale(id, sales);
  const updatedSale = {
    saleId: id,
    itemsUpdated: sales,
  };
  return { type: null, message: updatedSale };
};

module.exports = {
  registerSale,
  findAllSales,
  findSaleById,
  deleteSale,
  updateSale,
};

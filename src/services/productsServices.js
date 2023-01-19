const { productsModels } = require('../models');
const schema = require('./validations/validationsInputValue');

const findAll = async () => {
  const products = await productsModels.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;
  const product = await productsModels.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

const registerProduct = async (name) => {
  const firstError = schema.validateName(name);
  if (firstError.type) return firstError;
  const secondError = schema.validateNewProduct(name);
  if (secondError.type) return secondError;
  const newProductId = await productsModels.registerProduct(name);
  const newProduct = await productsModels.findById(newProductId);
  return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  findById,
  registerProduct,
};
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

const updateProduct = async (id, newName) => {
  const firstError = schema.validateName(newName);
  if (firstError.type) return firstError;
  const secondError = schema.validateNewProduct(newName);
  if (secondError.type) return secondError;
  const product = await productsModels.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productsModels.updateProduct(id, newName);
  const updatedProduct = {
    id,
    name: newName,
  };
  return { type: null, message: updatedProduct };
};

const deleteProduct = async (id) => {
  const product = await productsModels.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productsModels.deleteProduct(id);
  return { type: null, message: product };
};

const findByQuery = async (query) => {
  const product = await productsModels.findByQuery(query);
  return { type: null, message: product };
};

module.exports = {
  findAll,
  findById,
  registerProduct,
  updateProduct,
  deleteProduct,
  findByQuery,
};
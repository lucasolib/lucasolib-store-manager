const { idSchema, addProductSchema, verifyNameSchema, verifySaleSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  return { type: null, message: '' };
};

const validateName = (name) => {
  const { error } = verifyNameSchema.validate(name);
  if (error) {
    return {
      type: 'INVALID_VALUE',
      message: '"name" is required',
    };
  }
  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema.validate(name);
  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };
  } return { type: null, message: '' };
};

const validateNewSale = (sales, productsList) => {
  const saleError = sales.map((sale) => verifySaleSchema.validate(sale));
  if (saleError.some((sale) => sale.error)) {
    const { error } = saleError.find((sale) => sale.error);
    return {
      type: error.message.includes('required') ? 'UNDEFINED_VALUE' : 'INVALID_VALUE',
      message: error.message,
    };
  } const productsIds = productsList.map(({ id }) => +id);
  if (sales.some(({ productId }) => !productsIds.includes(productId))) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: '' };
};

const validateSaleId = (sale, id) => {
  const salesId = sale.map(({ saleId }) => saleId);
  if (!salesId.includes(Number(id))) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  } return { type: null, message: '' };
};

const validateUptadeSale = (sales, productsList, salesList, salesId) => {
  const firstError = validateNewSale(sales, productsList);
  if (firstError.type) return firstError;
  const secondError = validateSaleId(salesList, salesId);
  if (secondError.type) return secondError;
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateName,
  validateNewSale,
  validateUptadeSale,
};
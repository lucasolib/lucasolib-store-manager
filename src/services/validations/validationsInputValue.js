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

const validateNewSale = (sales) => {
  const saleError = sales.map((sale) => verifySaleSchema.validate(sale));
  if (saleError.some((sale) => sale.error)) {
    const { error } = saleError.find((sale) => sale.error);
    return {
      type: error.message.includes('required') ? 'UNDEFINED_VALUE' : 'INVALID_VALUE',
      message: error.message,
    };
  } return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateName,
  validateNewSale,
};
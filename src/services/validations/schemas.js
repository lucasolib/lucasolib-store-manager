const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const verifyNameSchema = Joi.string().required();
const addProductSchema = Joi.string().min(5).required();

module.exports = {
  idSchema,
  addProductSchema,
  verifyNameSchema,
};
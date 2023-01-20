const { salesServices } = require('../services');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const { type, message } = await salesServices.registerSale(req.body);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  createSale,
};

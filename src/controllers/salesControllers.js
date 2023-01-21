const { salesServices } = require('../services');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const { type, message } = await salesServices.registerSale(req.body);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(201).json(message);
};

const listAllSales = async (req, res) => {
  const { type, message } = await salesServices.findAllSales();
  if (type) return res.status(errorMap.mapError(type)).json(message);
  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.findSaleById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.deleteSale(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(204).end();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.updateSale(id, req.body);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  createSale,
  listAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};

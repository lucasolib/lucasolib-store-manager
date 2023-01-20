// const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const registerSale = async (sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE(NOW())',
  ); const fullSale = sale.map(({ productId, quantity }) => `(${insertId}, ${productId},
    ${quantity})`).join((', '));
  await connection.execute(
    `INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ${fullSale}`,
  ); return insertId;
}; 

module.exports = {
  registerSale,
};

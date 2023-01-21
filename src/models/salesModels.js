const camelize = require('camelize');
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

const findAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT id as sale_id, date, product_id, quantity FROM sales RIGHT JOIN sales_products
    ON sales.id = sale_id`,
  );
  return camelize(result);
};

const findSaleById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT date, product_id, quantity FROM sales 
    RIGHT JOIN sales_products
    ON sales.id  = sales_products.sale_id
    WHERE id = ${saleId}`,
  );
  return camelize(result);
};

const deleteSale = async (saleId) => {
  const affectedRows = await connection.execute(
    'DELETE FROM sales WHERE id = ?;',
    [saleId],
  );
  return affectedRows;
};

const updateSale = async (id, sale) => {
  await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?',
    [id],
  );
  const saleProducts = sale
    .map(({ productId, quantity }) => `(${id}, ${productId}, ${quantity})`)
    .join(', ');
  const updatedResult = await connection.execute(
    `INSERT INTO sales_products
    (sale_id, product_id, quantity)
    VALUES
      ${saleProducts}`,
  );
  return updatedResult;
};

module.exports = {
  registerSale,
  findAllSales,
  findSaleById,
  deleteSale,
  updateSale,
};

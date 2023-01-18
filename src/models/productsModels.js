const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return camelize(result);
};

const findById = async (productId) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return camelize(result[0]);
};

const registerProduct = async (newProduct) => {
  const columns = Object.keys(snakeize(newProduct)).join(', ');
   const placeholders = Object.keys(newProduct)
     .map((_key) => '?')
     .join(', ');
  const [{ insertId }] = await connection.execute(
    `INSERT INTO products (${columns}) VALUE (${placeholders})`,
    [...Object.values(newProduct)],
  );
  return insertId;
};

module.exports = {
  findAll,
  findById,
  registerProduct,
};
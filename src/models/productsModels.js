const camelize = require('camelize');
// const snakeize = require('snakeize');
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
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE(?)',
    [newProduct],
  );
  return insertId;
};

module.exports = {
  findAll,
  findById,
  registerProduct,
};
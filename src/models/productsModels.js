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

const updateProduct = async (id, newName) => connection.execute(
    `UPDATE products SET name = '${newName}' WHERE id = ${id}`,
  );

const deleteProduct = async (id) => {
  const affectedRows = await connection.execute(
    'DELETE FROM products WHERE id = ?;',
    [id],
  );
  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  registerProduct,
  updateProduct,
  deleteProduct,
};
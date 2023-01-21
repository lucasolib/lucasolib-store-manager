const products = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
];

const validName = 'produtoX';
const invalidName = 'a';

const newProductMock = {
  id: 3,
  name: validName,
};

const productUpdateMock = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: "Rows matched: 1  Changed: 1  Warnings: 0",
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
  undefined,
];

const updatedProductMock = {
  id: 1,
  name: "Martelo do Batman",
};

module.exports = {
  products,
  newProductMock,
  validName,
  invalidName,
  productUpdateMock,
  updatedProductMock,
};

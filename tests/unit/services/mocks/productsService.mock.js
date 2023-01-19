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

module.exports = {
  products,
  newProductMock,
  validName,
  invalidName,
};

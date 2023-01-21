const products = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  }
];

const newProductMock = {
  name: "produtoX",
};

const newProductMockWithId = { id: 3, ...newProductMock };

const updatedProductMock = {
  id: 1,
  name: "Martelo do Batman",
};

module.exports = {
  products,
  newProductMock,
  newProductMockWithId,
  updatedProductMock,
};
const { expect } = require('chai');
const sinon = require('sinon');
const { productsModels } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products, newProductMock } = require('./mocks/productsModel.mock.js');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products])
    // Act
    const allProducts = await productsModels.findAll();
    // Assert
    expect(allProducts).to.be.deep.equal(products);
  });

  it('Recuperando um produto pelo ID', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // Act
    const product = await productsModels.findById(1);
    // Assert
    expect(product).to.be.deep.equal(products[0]);
  });

  it('Cadastrando um novo produto', async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([{ insertId: 3 }]);
    // Act
    const newProduct = await productsModels.registerProduct(newProductMock);
    // Assert
    expect(newProduct).to.equal(3);
  });

  afterEach(function () {
    sinon.restore();
  });
});

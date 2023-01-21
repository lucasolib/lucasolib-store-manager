const { expect } = require('chai');
const sinon = require('sinon');
const { productsModels } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const {
  products,
  newProductMock,
  productUpdateMock,
} = require("./mocks/productsModel.mock.js");

describe('Testes de unidade do model de produtos', function () {
  describe('Testes de recuperar produtos', function () {
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
  });

  describe('Testes de cadastrar produtos', function () {
    it('Cadastrando um novo produto', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
      // Act
      const newProduct = await productsModels.registerProduct(newProductMock);
      // Assert
      expect(newProduct).to.equal(3);
    });
  });

  describe('Testes de atualizar produtos', function () {
    it('Atualizando um produto', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves(productUpdateMock);
      // Act
      const result = await productsModels.updateProduct(1, 'Martelo do Batman');
      // Assert
      expect(result[0].affectedRows).to.be.deep.equal(1);
      expect(result[0].changedRows).to.be.deep.equal(1);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});

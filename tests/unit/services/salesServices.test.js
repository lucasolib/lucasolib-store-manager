const { expect } = require('chai');
const sinon = require('sinon');
const { salesServices } = require('../../../src/services');
const { salesModels, productsModels } = require('../../../src/models');

const {
  newSaleMock,
  fullSaleMock,
  productsMock,
  noQuantitySaleMock,
  noIdSaleMock,
  invalidQuantityMock,
  invalidIdProductMock,
} = require('./mocks/salesServices.mock.js');

describe('Testes de unidade do service de vendas', function () {
  describe('Testes de cadastrar vendas', function () {
    it('Cadastra uma venda', async function () {
      // arrange
      sinon.stub(salesModels, 'registerSale').resolves(1);
      sinon.stub(productsModels, 'findAll').resolves(productsMock);
      // act
      const result = await salesServices.registerSale(newSaleMock);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(fullSaleMock);
    });

    it('Cadastrar uma venda sem a quantidade deve gerar um erro', async function () {
      // act
      const result = await salesServices.registerSale(noQuantitySaleMock);
      // assert
      expect(result.type).to.equal('UNDEFINED_VALUE');
      expect(result.message).to.be.deep.equal('"quantity" is required');
    });

    it('Cadastrar uma venda sem id de produto deve gerar um erro', async function () {
      // act
      const result = await salesServices.registerSale(noIdSaleMock);
      // assert
      expect(result.type).to.equal('UNDEFINED_VALUE');
      expect(result.message).to.be.deep.equal('"productId" is required');
    });

    it('Cadastrar uma venda com quantidade menor que um deve gerar um erro', async function () {
      // act
      const result = await salesServices.registerSale(invalidQuantityMock);
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.be.deep.equal(
        '"quantity" must be greater than or equal to 1'
      );
    });

    it('Cadastrar uma venda com Id de produto inexistente deve gerar um erro', async function () {
      // act
      const result = await salesServices.registerSale(invalidIdProductMock);
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.deep.equal('Product not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});

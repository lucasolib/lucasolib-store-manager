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
  saleWithTimeMock,
  saleWithoutIdMock,
  updatedSaleMock,
} = require("./mocks/salesServices.mock.js");

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

  describe('Testes de cadastrar vendas', function () {
    it('Lista todas as vendas', async function () {
      // arrange
      sinon.stub(salesModels, 'findAllSales').resolves(saleWithTimeMock);
      // act
      const result = await salesServices.findAllSales();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(saleWithTimeMock);
    });

    it('Lista uma única venda pelo Id', async function () {
      // arrange
      sinon.stub(salesModels, 'findSaleById').resolves(saleWithTimeMock);
      // act
      const result = await salesServices.findSaleById(1);
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(saleWithTimeMock);
    });

    it('Retorna um erro caso Id não seja validado', async function () {
      // act
      const result = await salesServices.findSaleById('a');
      // assert
      expect(result.type).to.be.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal('"id" must be a number');
    });

    it('Retorna um erro caso Id não represente uma venda', async function () {
      // act
      const result = await salesServices.findSaleById(99);
      // assert
      expect(result.type).to.be.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });
  });

  describe("Testes de deletar vendas", function () {
    it("Deleta uma venda", async function () {
      // arrange
      sinon
        .stub(salesModels, "deleteSale")
        .resolves({ affectedRows: 1 });
      sinon.stub(salesModels, "findSaleById").resolves(saleWithoutIdMock);
      // act
      const result = await salesServices.deleteSale(1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(saleWithoutIdMock);
    });

    it("Gera um erro ao tentar deletar uma venda inexistente", async function () {
      // act
      const result = await salesServices.deleteSale(999);
      // assert
      expect(result.type).to.equal("SALE_NOT_FOUND");
      expect(result.message).to.be.deep.equal("Sale not found");
    });
  });

  describe('Testes de atualizar vendas', function () {
    it('Atualiza uma venda', async function () {
      // arrange
      sinon.stub(salesModels, 'updateSale').resolves({ affectedRows: 2 });
      sinon.stub(salesModels, "findSaleById").resolves(saleWithTimeMock);
      // act
      const result = await salesServices.updateSale(1, newSaleMock);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(updatedSaleMock);
    });

    it("Gera um erro se a venda não existir", async function () {
      // act
      const result = await salesServices.updateSale(999, newSaleMock);
      // assert
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.be.deep.equal('Sale not found');
    });

    it("Gera um erro se a venda for atualizada com dados inapropriados", async function () {
      // act
      const result = await salesServices.updateSale(1, noQuantitySaleMock);
      // assert
      expect(result.type).to.equal("UNDEFINED_VALUE");
      expect(result.message).to.be.deep.equal('"quantity" is required');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});

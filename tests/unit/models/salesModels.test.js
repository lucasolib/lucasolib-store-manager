const { expect } = require('chai');
const sinon = require('sinon');
const { salesModels } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { newSaleMock, allSalesMock } = require('./mocks/salesModels.mock.js');

describe('Testes de unidade do model de vendas', function () {
  describe('Testes de cadastrar vendas', function () {
    it('Cadastrar uma venda deve retornar status 201 e a venda realizada', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);
      // Act
      const sale = await salesModels.registerSale(newSaleMock);
      // Assert
      expect(sale).to.equal(5);
    });
  });

  describe('Testes de listar as vendas', function () {
    it('Recuperar todas as vendas', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([allSalesMock]);
      // Act
      const allSales = await salesModels.findAllSales();
      // Assert
      expect(allSales).to.be.deep.equal(allSalesMock);
    });

    it('Recuperar uma única venda', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([allSalesMock]);
      // Act
      const product = await salesModels.findSaleById(1);
      // Assert
      expect(product).to.be.deep.equal(allSalesMock);
    });
  });

  describe("Testes de deletar vendas", function () {
    it("Deletando uma venda", async function () {
      // Arrange
      sinon.stub(connection, "execute").resolves({ affectedRows: 1 });
      // Act
      const result = await salesModels.deleteSale(1);
      // Assert
      expect(result.affectedRows).to.be.deep.equal(1);
    });
  });

  describe("Testes de atualizar vendas", function () {
    it("Atualizando uma venda", async function () {
      // Arrange
      sinon
        .stub(connection, "execute")
        .onFirstCall()
        .resolves({ affectedRows: 2 })
        .onSecondCall()
        .resolves({ affectedRows: 2 });
      // Act
      const result = await salesModels.updateSale(1, newSaleMock);
      // Assert
      expect(result.affectedRows).to.be.deep.equal(2);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});

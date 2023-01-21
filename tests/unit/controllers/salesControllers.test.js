const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);
const { salesServices } = require('../../../src/services');
const { salesControllers } = require('../../../src/controllers');
const {
  fullSaleMock,
  bodyMock,
  saleWithTimeMock,
  saleWithoutIdMock,
} = require("./mocks/salesControllers.mock.js");

describe('Testes de unidade do controller de vendas', function () {
  describe('Testes de cadastrar vendas', function () {
    it('Ao enviar uma venda, deve cadastra-la', async function () {
      // arrange
      const res = {};
      const req = {
        body: bodyMock,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, 'registerSale')
        .resolves({ type: null, message: fullSaleMock });
      // act
      await salesControllers.createSale(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(fullSaleMock);
    });

    it('Ao enviar uma venda com erro, deve retornar o erro', async function () {
      // arrange
      const res = {};
      const req = {
        body: [
          {
            productId: 999,
            quantity: 2,
          },
        ],
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, 'registerSale')
        .resolves({
          type: 'PRODUCT_NOT_FOUND',
          message: 'Product not found',
        });
      // act
      await salesControllers.createSale(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(
        { message: 'Product not found' }
      );
    });
  });

  describe('Testes de listar vendas', function () {
    it('Lista todas as vendas', async function () {
      // arrange
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, 'findAllSales')
        .resolves({ type: null, message: saleWithTimeMock });
      // act
      await salesControllers.listAllSales(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleWithTimeMock);
    });

    it('Retorna um erro caso Type chegue ao controller', async function () {
      // arrange
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, 'findAllSales')
        .resolves({ type: 'SYSTEM_ERROR', message: 'Server error' });
      // act
      await salesControllers.listAllSales(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith('Server error');
    });

    it('Deve retornar os status 200 e a venda pelo Id', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, 'findSaleById')
        .resolves({ type: null, message: saleWithTimeMock });
      // act
      await salesControllers.getSaleById(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleWithTimeMock);
    });

    it('Deve retornar os status 200 e a venda pelo Id', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 99 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, 'findSaleById')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
      // act
      await salesControllers.getSaleById(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

describe("Testes de deletar vendas", function () {
  it("Deve retornar o status 200 caso a venda seja deletada", async function () {
    // arrange
    const res = {};
    const req = {
      params: {
        id: 1,
      },
    };
    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();
    sinon
      .stub(salesServices, 'deleteSale')
      .resolves({ type: null, message: saleWithoutIdMock });
    // act
    await salesControllers.deleteSale(req, res);
    // assert
    expect(res.status).to.have.been.calledWith(204);
  });

  it("Deve retornar o status 404 e o erro de venda não encontrada", async function () {
    // arrange
    const res = {};
    const req = {
      params: {
        id: 999,
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesServices, "deleteSale")
      .resolves({ type: "SALE_NOT_FOUND", message: "Sale not found" });
    // act
    await salesControllers.deleteSale(req, res);
    // assert
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
  });
});

  afterEach(function () {
    sinon.restore();
  });
});

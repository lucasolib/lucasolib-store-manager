const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);
const { salesServices } = require('../../../src/services');
const { salesControllers } = require('../../../src/controllers');
const { fullSaleMock, bodyMock } = require('./mocks/salesControllers.mock.js');

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

  afterEach(function () {
    sinon.restore();
  });
});

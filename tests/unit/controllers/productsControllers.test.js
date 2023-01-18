const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsServices } = require('../../../src/services');
const { productsControllers } = require('../../../src/controllers');
const { products } = require('./mocks/productsControllers.mock.js');

describe('Testes de unidade do controller de produtos', function () {
    it('Deve retornar o status 200 e a lista de produtos', async function () {
      // arrange
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "findAll")
        .resolves({ type: null, message: products });
      // act
      await productsControllers.listProducts(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });

  it('Deve retornar os status 200 e o passageiro pelo Id', async function () {
    // arrange
    const res = {};
    const req = {
      params: { id: 1 },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsServices, 'findById')
      .resolves({ type: null, message: products[0] });
    // act
    await productsControllers.getProductById(req, res);
    // assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
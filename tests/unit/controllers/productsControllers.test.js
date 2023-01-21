const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsServices } = require('../../../src/services');
const { productsControllers } = require('../../../src/controllers');
const {
  products,
  newProductMock,
  newProductMockWithId,
  updatedProductMock,
} = require("./mocks/productsControllers.mock.js");

describe('Testes de unidade do controller de produtos', function () {
  describe('Testes de recuperar produtos', function () {
    it('Deve retornar o status 200 e a lista de produtos', async function () {
      // arrange
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'findAll')
        .resolves({ type: null, message: products });
      // act
      await productsControllers.listProducts(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });

    it('Deve retornar o status 500 e a mensagem de erro caso não encontre nenhum produto', async function () {
      // arrange
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'findAll')
        .resolves({ type: 500, message: 'Server Error' });
      // act
      await productsControllers.listProducts(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith('Server Error');
    });

    it('Deve retornar os status 200 e o produto pelo Id', async function () {
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

    it('Deve retornar os status 404 caso não encontre o produto pelo ID', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 999 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'findById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      // act
      await productsControllers.getProductById(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });
    });

    describe('Testes de cadastrar produtos', function () {
      it('Ao enviar um nome válido, deve cadastrar o produto', async function () {
        // arrange
        const res = {};
        const req = {
          body: newProductMock,
        };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon
          .stub(productsServices, 'registerProduct')
          .resolves({ type: null, message: newProductMockWithId });
        // act
        await productsControllers.createProduct(req, res);
        // assert
        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(newProductMockWithId)
      });

      it('Ao enviar um nome com menos de 5 caracteres, gera um erro', async function () {
        // arrange
        const res = {};
        const req = {
          body: {
            name: 'Luz',
          },
        };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon
          .stub(productsServices, 'registerProduct')
          .resolves({
            type: 'INVALID_VALUE',
            message: '"name" length must be at least 5 characters long',
          });
        // act
        await productsControllers.createProduct(req, res);
        // assert
        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith(
          { message: '"name" length must be at least 5 characters long' }
        );
      });
    });
  });
  
  describe('Testes de atualizar produtos', function () {
    it('Deve retornar o status 200 e o produto atualizado', async function () {
      // arrange
      const res = {};
      const req = {
        body: {
          name: 'Martelo do Batman',
        },
        params: {
          id: 1
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'updateProduct')
        .resolves({ type: null, message: updatedProductMock });
      // act
      await productsControllers.updateProduct(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedProductMock);
    });

    it("Deve retornar o status 404 e o erro de produto não encontrado", async function () {
      // arrange
      const res = {};
      const req = {
        body: {
          name: "Martelo do Batman",
        },
        params: {
          id: 999,
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, "updateProduct")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });
      // act
      await productsControllers.updateProduct(req, res);
      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Product not found" });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
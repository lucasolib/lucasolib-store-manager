const { expect } = require('chai');
const sinon = require('sinon');
const { productsServices } = require('../../../src/services');
const { productsModels } = require('../../../src/models');

const {
  products,
  newProductMock,
  validName,
  invalidName,
  productUpdateMock,
  updatedProductMock, 
} = require('./mocks/productsService.mock.js');

describe('Testes de unidade do service de produtos', function () {
  describe('Testes de recuperar produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(productsModels, 'findAll').resolves(products);
      // act
      const result = await productsServices.findAll();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(products);
    });

    it('retorna o produto específico pelo Id', async function () {
      // arrange
      sinon.stub(productsModels, 'findById').resolves(products[0]);
      // act
      const result = await productsServices.findById(1);
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(products[0]);
    });

    it('retorna um erro caso o Id seja invalido', async function () {
      // act
      const result = await productsServices.findById('a');
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso o produto não exista', async function () {
      // arrange
      sinon.stub(productsModels, 'findById').resolves(undefined);
      // act
      const result = await productsServices.findById(9999);
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
  });

  describe('Testes de cadastrar produtos', function () {
    it('Cadastra um produto novo', async function () {
      // arrange
      sinon.stub(productsModels, 'registerProduct').resolves(3);
      sinon.stub(productsModels, 'findById').resolves(newProductMock);
      // act
      const result = await productsServices.registerProduct(validName);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(newProductMock);
    });

    it('Retorna um erro caso name não exista', async function () {
      // arrange
      // act
      const result = await productsServices.registerProduct(undefined);
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" is required');
    });

    it('Retorna um erro caso name seja menor do que 5', async function () {
      // arrange
      // act
      const result = await productsServices.registerProduct(invalidName);
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal(
        '"name" length must be at least 5 characters long'
      );
    });
  });

  describe('Testes de atualizar produtos', function () {
    it('Atualiza um produto', async function () {
      // arrange
      sinon.stub(productsModels, 'updateProduct').resolves(productUpdateMock);
      sinon.stub(productsModels, 'findById').resolves(products[0]);
      // act
      const result = await productsServices.updateProduct(1, 'Martelo do Batman');
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(updatedProductMock);
    });

    it('Gera um erro ao tentar atualizar um produto inexistente', async function () {
      // act
      const result = await productsServices.updateProduct(
        999,
        "Martelo do Batman"
      );
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.deep.equal('Product not found');
    });

    it("Gera um erro ao tentar atualizar um produto sem passar um nome", async function () {
      // act
      const result = await productsServices.updateProduct(
        999,
      );
      // assert
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.be.deep.equal('"name" is required');
    });

    it("Gera um erro ao tentar atualizar um produto passando um nome inválido", async function () {
      // act
      const result = await productsServices.updateProduct(999 , 'oi');
      // assert
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.be.deep.equal(
        '"name" length must be at least 5 characters long'
      );
    });
  });

  describe('Testes de deletar produtos', function () {
    it('Deleta um produto', async function () {
      // arrange
      sinon.stub(productsModels, 'deleteProduct').resolves({ affectedRows: 1 });
      sinon.stub(productsModels, 'findById').resolves(products[0]);
      // act
      const result = await productsServices.deleteProduct(1);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(products[0]);
    });

    it('Gera um erro ao tentar deletar um produto inexistente', async function () {
      // act
      const result = await productsServices.deleteProduct(999);
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.deep.equal('Product not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});

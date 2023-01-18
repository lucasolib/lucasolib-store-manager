const { expect } = require("chai");
const sinon = require("sinon");
const { productsServices } = require("../../../src/services");
const { productsModels } = require("../../../src/models");

const { products } = require("./mocks/productsService.mock.js");

describe("Testes de unidade do service de produtos", function () {
    it("retorna a lista completa de pessoas passageiras", async function () {
      // arrange
      sinon.stub(productsModels, "findAll").resolves(products);
      // act
      const result = await productsServices.findAll();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(products);
    });

  it("retorna o produto específico pelo Id", async function () {
      // arrange
      sinon.stub(productsModels, "findById").resolves(products[0]);
      // act
      const result = await productsServices.findById(1);
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(products[0]);
  });
    
    it("retorna um erro caso o Id seja invalido", async function () {
      // act
      const result = await productsServices.findById('a');
      // assert
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal('"id" must be a number');
    });

    it("retorna um erro caso o produto não exista", async function () {
      // arrange
      sinon.stub(productsModels, 'findById').resolves(undefined);
      // act
      const result = await productsServices.findById(9999);
      // assert
      expect(result.type).to.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.equal('Product Not Found');
    });

  afterEach(function () {
    sinon.restore();
  });
});

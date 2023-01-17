const { expect } = require("chai");
const sinon = require("sinon");
const { productsModels } = require("../../../src/models");

const connection = require("../../../src/models/connection");
const { products } = require("./mocks/productsModel.mock");

describe("Testes de unidade do model de produtos", function () {
  it("Recuperando a lista de produtos", async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products])
    // Act
    const allProducts = await productsModels.findAll();
    // Assert
    expect(allProducts).to.be.deep.equal(products);
  });

  it("Recuperando um produto pelo ID", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([products[0]]);
    // Act
    const product = await productsModels.findById(1);
    // Assert
    expect(product).to.be.deep.equal(products[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});

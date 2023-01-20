const allSalesMock = [{
    id: 1,
    itemsSold: [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 2,
        quantity: 7,
      },
    ],
  },
  {
    id: 2,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 4,
      },
    ],
  },
  {
    id: 3,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  },
];

const newSaleMock = [
  {
    productId: 1,
    quantity: 2,
  },
  {
    productId: 2,
    quantity: 7,
  },
];

const fullSaleMock = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 2,
    },
    {
      productId: 2,
      quantity: 7,
    },
  ],
};

const productsMock = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
];

const noQuantitySaleMock = [
  {
    productId: 1,
  },
  {
    productId: 2,
    quantity: 7,
  },
];

const noIdSaleMock = [
  {
    quantity:1,
  },
  {
    productId: 2,
    quantity: 7,
  },
];

const invalidQuantityMock = [
  {
    productId: 1,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 7,
  },
];

const invalidIdProductMock = [
  {
    productId: 999,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 7,
  },
];

module.exports = {
  allSalesMock,
  newSaleMock,
  fullSaleMock,
  productsMock,
  noQuantitySaleMock,
  noIdSaleMock,
  invalidQuantityMock,
  invalidIdProductMock,
};

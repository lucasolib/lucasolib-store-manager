const allSalesMock = [
  { id: 1,
    itemsSold: [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 4,
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
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

module.exports = {
  allSalesMock,
  newSaleMock,
};
const fullSaleMock = {
  id: 1,
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
};

const bodyMock = [{
      productId: 1,
      quantity: 2,
    },
    {
      productId: 4,
      quantity: 7,
    }];

  const saleWithTimeMock = [
    {
      saleId: 1,
      date: "2021-09-09T04:54:29.000Z",
      productId: 1,
      quantity: 2,
    },
    {
      saleId: 1,
      date: "2021-09-09T04:54:54.000Z",
      productId: 2,
      quantity: 2,
    },
  ];

const saleWithoutIdMock = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

const updatedSaleMock = {
  saleId: 1,
  itemsUptaded: [
    {
      productId: 1,
      quantity: 2,
    },
    {
      productId: 4,
      quantity: 7,
    },
  ]
};


module.exports = {
  fullSaleMock,
  bodyMock,
  saleWithTimeMock,
  saleWithoutIdMock,
  updatedSaleMock,
};
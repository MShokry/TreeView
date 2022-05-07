const {faker} = require('@faker-js/faker');

/*
Asuming the data is ready for tree processing
[
  {
    id: 1,
    name: 'Phones',
    childs: [
      {
        id: 2,
        name: 'Samsung',
        childs: [
          {
            id: 3,
            name: 'Samsung Galaxy S10+',
            childs: [
              {
                id: 4,
                name: '128 GB',
              },
            ],
          },
        ],
      },
    ],
  },
];
*/

// using fakerjs to creat prodcuts
const CAT = Math.floor(Math.random() * 15) + 1;
const BRAND = Math.floor(Math.random() * 10) + 1;
const MODEL = Math.floor(Math.random() * 10) + 1;
const VAR = Math.floor(Math.random() * 10) + 1;

export const products = Array(CAT)
  .fill(0)
  .map(_ => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.department(),
    devices: faker.random.numeric({min: 0, max: 5000}),
    type: 'CATEGORY',
    childs: Array(BRAND)
      .fill(0)
      .map(_ => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.department(),
        devices: faker.random.numeric({min: 0, max: 5000}),
        type: 'BRAND',
        childs: Array(MODEL)
          .fill(0)
          .map(_ => ({
            id: faker.datatype.uuid(),
            name: faker.commerce.product(),
            devices: faker.random.numeric({min: 0, max: 5000}),
            type: 'MODEL',
            childs: Array(VAR)
              .fill(0)
              .map(_ => ({
                id: faker.datatype.uuid(),
                name: faker.commerce.productAdjective(),
                devices: faker.random.numeric({min: 0, max: 5000}),
                type: 'VARIANT',
              })),
          })),
      })),
  }));

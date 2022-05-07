export const sample = [
  {
    id: '8',
    name: 'Phones',
    devices: '4',
    type: 'CATEGORY',
    childs: [
      {
        id: '1',
        name: 'Samsung',
        devices: '4',
        type: 'BRAND',
        childs: [
          {
            id: '1',
            name: 'Galaxy S10+',
            devices: '9',
            type: 'MODEL',
            childs: [
              {id: '1', name: '10GB', devices: '3', type: 'VARIANT'},
              {id: '6', name: '16GB', devices: '3', type: 'VARIANT'},
              {id: '6', name: 'Recycled', devices: '3', type: 'VARIANT'},
            ],
          },
          {
            id: '3',
            name: 'Note',
            devices: '5',
            type: 'MODEL',
            childs: [
              {id: '7', name: '128', devices: '7', type: 'VARIANT'},
              {id: '1', name: 'Refined', devices: '1', type: 'VARIANT'},
            ],
          },
        ],
      },
      {
        id: '2',
        name: 'Apple',
        devices: '4',
        type: 'BRAND',
        childs: [
          {
            id: '5',
            name: 'iPhone X',
            devices: '1',
            type: 'MODEL',
            childs: [
              {id: '6', name: '64GB', devices: '6', type: 'VARIANT'},
              {id: '1', name: '128G', devices: '4', type: 'VARIANT'},
            ],
          },
          {
            id: '1',
            name: 'Iphone11',
            devices: '7',
            type: 'MODEL',
            childs: [
              {id: '3', name: '10G', devices: '5', type: 'VARIANT'},
              {id: '3', name: '12G', devices: '2', type: 'VARIANT'},
            ],
          },
        ],
      },
    ],
    selected: false,
    show: false,
  },
  {
    id: '4',
    name: 'Beauty',
    devices: '2',
    type: 'CATEGORY',
    childs: [
      {
        id: '1',
        name: 'Baby',
        devices: '4',
        type: 'BRAND',
        childs: [
          {
            id: '7',
            name: 'Table',
            devices: '5',
            type: 'MODEL',
            childs: [
              {id: '9', name: 'Awesome', devices: '2', type: 'VARIANT'},
              {id: '6', name: 'Unbranded', devices: '6', type: 'VARIANT'},
            ],
          },
          {
            id: '1',
            name: 'Pants',
            devices: '5',
            type: 'MODEL',
            childs: [
              {id: '6', name: 'Modern', devices: '6', type: 'VARIANT'},
              {id: '1', name: 'Fantastic', devices: '8', type: 'VARIANT'},
            ],
          },
        ],
      },
      {
        id: '3',
        name: 'Music',
        devices: '9',
        type: 'BRAND',
        childs: [
          {
            id: '4',
            name: 'Shirt',
            devices: '7',
            type: 'MODEL',
            childs: [
              {id: '9', name: 'Rustic', devices: '3', type: 'VARIANT'},
              {id: '7', name: 'Bespoke', devices: '8', type: 'VARIANT'},
            ],
          },
          {
            id: '6',
            name: 'Mouse',
            devices: '9',
            type: 'MODEL',
            childs: [
              {id: '2', name: 'Generic', devices: '3', type: 'VARIANT'},
              {id: '3', name: 'Rustic', devices: '3', type: 'VARIANT'},
            ],
          },
        ],
      },
    ],
    selected: false,
    show: false,
  },
];

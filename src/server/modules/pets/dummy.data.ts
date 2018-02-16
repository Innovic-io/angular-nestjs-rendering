import { IAccount } from './interfaces/pet.interface';
import { createObjectID } from './services/service.helper';
import { IChirps } from '../chirps/interfaces/chirps.interface';

// @TODO ownerId need to be same as id from Owner
export const dummyAccount: IAccount[] =
  [
    {
      ownerId: createObjectID('5a85393458f4201d3275c111'),
      _id: createObjectID('5a85393458f4201d3275c222'),
      amount: 2500,
    },
    {
      ownerId: createObjectID('5a8539b658f4201d3275c112'),
      _id: createObjectID('5a85393458f4201d3275c223'),
      amount: 2100,
    },
    {
      ownerId: createObjectID('5a8539b658f4201d3275c112'),
      _id: createObjectID('5a85393458f4201d3275c224'),
      amount: 2300,
    },
    {
      ownerId: createObjectID('5a8539b658f4201d3275c112'),
      _id: createObjectID('5a85393458f4201d3275c225'),
      amount: 9500,
    },

  ];

export const dummyChirps: IChirps[] = [
  {
    _id: 0,
    text: 'some text given',
    ownerId: createObjectID('5a85574b847a38444d536a5e'),
  },
  {
    _id: 1,
    text: 'text given',
    ownerId: createObjectID('5a85574b847a38444d536a5e'),
  },
];

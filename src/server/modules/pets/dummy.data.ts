import { IAccount } from './interfaces/pet.interface';
import { createObjectID } from './services/service.helper';
import { IChirps } from '../chirps/interfaces/chirps.interface';

// @TODO ownerId need to be same as id from Owner
export const dummyAccount: IAccount[] =
  [
    {
      ownerId: createObjectID('5a85393458f4201d3275c111'),
      id: 1,
      amount: 2500,
    },
    {
      ownerId: createObjectID('5a8539b658f4201d3275c112'),
      id: 2,
      amount: 2100,
    },
    {
      ownerId: createObjectID('5a8539b658f4201d3275c112'),
      id: 3,
      amount: 2300,
    },
    {
      ownerId: createObjectID('5a8539b658f4201d3275c112'),
      id: 4,
      amount: 9500,
    },

  ];

export const dummyChirps: IChirps[] = [
  {
    id: 0,
    text: 'some text given',
    ownerId: createObjectID('5a85574b847a38444d536a5e'),
  },
  {
    id: 1,
    text: 'text given',
    ownerId: createObjectID('5a85574b847a38444d536a5e'),
  },
];

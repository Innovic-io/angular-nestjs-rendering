import { ObjectID } from 'bson';
import { IAccount } from './interfaces/pet.interface';

export const dummyAccount: IAccount[] =
  [
    {
      ownerId: new ObjectID('5a85393458f4201d3275c111'),
      id: 1,
      amount: 2500,
    },
    {
      ownerId: new ObjectID('5a8539b658f4201d3275c112'),
      id: 2,
      amount: 2100,
    },
    {
      ownerId: new ObjectID('5a8539b658f4201d3275c112'),
      id: 3,
      amount: 2300,
    },
    {
      ownerId: new ObjectID('5a8539b658f4201d3275c112'),
      id: 4,
      amount: 9500,
    },

  ];

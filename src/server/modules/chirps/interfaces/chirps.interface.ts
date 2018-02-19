import { ObjectID } from 'mongodb';

export interface IChirps {
  _id: number;
  text: string;
  ownerId: ObjectID;
}

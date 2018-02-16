import { ObjectID } from 'bson';

export interface IChirps {
  _id: number;
  text: string;
  ownerId: ObjectID;
}

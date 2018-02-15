import { ObjectID } from 'bson';

export interface IChirps {
  id: number;
  text: string;
  ownerId: ObjectID;
}

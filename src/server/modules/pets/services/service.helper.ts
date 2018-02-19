import { ObjectID } from 'mongodb';

export function createObjectID(id?: string): ObjectID {

  return new ObjectID(id);
}

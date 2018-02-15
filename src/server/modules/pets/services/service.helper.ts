import { ObjectID } from 'bson';

export function createObjectID(id?: string): ObjectID {

  return new ObjectID(id);
}

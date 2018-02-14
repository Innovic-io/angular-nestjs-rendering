import { ObjectID } from 'bson';

export function createObjectID(id: string): ObjectID {

  return ObjectID.createFromHexString(id.toString());
}

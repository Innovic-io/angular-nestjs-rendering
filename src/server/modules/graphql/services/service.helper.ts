import { ObjectID } from 'bson';

export function transferId(id: string): ObjectID {
  return ObjectID.createFromHexString(id.toString());
}

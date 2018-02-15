import { createObjectID } from './service.helper';
import { ObjectID } from 'bson';

describe('service helper', () => {

  const id = '5a85574b847a38444d536a5e';
  it('should create ObjectID', () => {

    expect(createObjectID(id)).toEqual(new ObjectID('5a85574b847a38444d536a5e'));
  });

  it('should validate ObjectID', () => {

    expect(ObjectID.isValid(id)).toBe(true);
  });
});

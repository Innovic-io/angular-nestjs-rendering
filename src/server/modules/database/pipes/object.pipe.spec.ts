import { Types } from 'mongoose';
import { ArgumentMetadata } from '@nestjs/common';

import { ObjectIDPipe } from './objectid.pipe';

describe('ObjectID pipe', () => {
  let objectID: ObjectIDPipe;
  const metaData: ArgumentMetadata = { type: 'param', data: 'id' };

  beforeEach(() => {
    objectID = new ObjectIDPipe();
  });

  it('should throw exception on invalid ObjectID', async (done) => {

    try {

      await objectID.transform('a23', metaData);

    } catch (e) {

      expect(e.status).toBe(400);

    } finally {

      done();
    }

  });

  it('should return valid ObjectID', async (done) => {

    const validObjectId = new Types.ObjectId().toHexString();
    const transformedObjectId = await objectID.transform(validObjectId, metaData);

    expect(transformedObjectId).toEqual(validObjectId);

    done();
  });

});

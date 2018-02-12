import * as mongoose from 'mongoose';

import { DATABASE_TOKEN, DATABASE_URI } from './database.constants';

export const databaseProviders = [
  {
    provide: DATABASE_TOKEN,
    useFactory: async () => {

      (mongoose as any).Promise = global.Promise;
/*
      if (process.env.NODE_ENV === 'test') {

        const mockgoose = new Mockgoose(mongoose);
        mockgoose.helper.setDbVersion('3.4.3');

        mockgoose.prepareStorage()
          .then(async () => {
            await mongoose.connect(DATABASE_TEST_URI, {
              useMongoClient: true,
            });
          });

      } else {
*/

      await mongoose.connect(DATABASE_URI, {
          useMongoClient: true,
        });
  //    }

      return mongoose;
    },
  },
];

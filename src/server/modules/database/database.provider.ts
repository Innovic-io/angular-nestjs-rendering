import { MongoClient } from 'mongodb';

import { DATABASE_NAME, DATABASE_TOKEN, DATABASE_URI } from './database.constants';

export const databaseProviders = [
  {
    provide: DATABASE_TOKEN,
    useFactory: async () => {

      const connection = await MongoClient.connect(DATABASE_URI);

      return connection.db(DATABASE_NAME);
    },
  },
];

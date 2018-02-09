import { Module } from '@nestjs/common';

import { databaseProviders } from './database.provider';

@Module({
  modules: [],
  components: [
    ...databaseProviders,
  ],
  exports: [
    ...databaseProviders,
  ],
})
export class DatabaseModule {}

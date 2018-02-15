import { Module } from '@nestjs/common';
import { ChirpsResolver } from './chirps.resolver';

@Module({
  imports: [],
  components: [
    ChirpsResolver,
  ],
})
export class ChirpsModule {}

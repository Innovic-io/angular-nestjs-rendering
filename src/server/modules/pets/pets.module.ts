import { Module } from '@nestjs/common';
import { PetsResolvers } from './pets.resolvers';
import { OwnerService } from './services/owner.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [ DatabaseModule ],
  components: [
    PetsResolvers,
    OwnerService,
  ],
})
export class PetsModule {}

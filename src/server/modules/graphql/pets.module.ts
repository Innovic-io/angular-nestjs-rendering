import { Module } from '@nestjs/common';
import { PetsService } from './services/pets.service';
import { PetsResolvers } from './pets.resolvers';
import { OwnerService } from './services/owner.service';

@Module({
  imports: [], // DatabaseModule],
  components: [
    PetsService,
    PetsResolvers,
    OwnerService,
  ],
})
export class PetsModule {}

import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolvers } from './pets.resolvers';
import {OwnerService} from './services/owner.service';
import {DatabaseModule} from '../database/database.module';
import {PetOwnerService} from './services/petowner.service';

@Module({
  imports: [], // DatabaseModule],
  components: [
    PetsService,
    PetsResolvers,
    OwnerService,
    PetOwnerService],
})
export class PetsModule {}

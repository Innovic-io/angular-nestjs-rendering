import { Query, Resolver } from '@nestjs/graphql';
import { IChirps } from './interfaces/chirps.interface';
import { dummyChirps } from '../pets/dummy.data';

@Resolver('Chirp')
export class ChirpsResolver {
  private chirps: IChirps[] = dummyChirps;

  @Query()
  chirpsByOwnerId(parent, {ownerId}, context?, info?) {

    return this.chirps.filter((single) => single.ownerId.equals(ownerId));
  }

  @Query()
  chirpById(parent, { id }, context?, info?) {

    return this.chirps.find((single) => single.id === +id);
  }
}

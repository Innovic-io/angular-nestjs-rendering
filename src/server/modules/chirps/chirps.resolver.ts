import { Query, Resolver } from '@nestjs/graphql';
import { IChirps } from './interfaces/chirps.interface';
import { ObjectID } from 'bson';

@Resolver('Chirp')
export class ChirpsResolver {
  private chirps: IChirps[] = [{
    id: 0,
    text: 'some text given',
    ownerId: new ObjectID('5a85574b847a38444d536a5e'),
  },
  {
    id: 1,
    text: 'text given',
    ownerId: new ObjectID('5a85574b847a38444d536a5e'),
  },
  ];

  @Query()
  chirpsByOwnerId(parent, {ownerId}, context, info) {

    return this.chirps.filter((single) => single.ownerId.equals(ownerId));
  }

  @Query()
  chirpById(parent, { id }, context, info) {

    return this.chirps.find((single) => single.id === +id);
  }
}

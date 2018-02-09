import { Component } from '@nestjs/common';
import { IPetOwner } from '../interfaces/pet.interface';
import {dummyPetOwner} from '../dummy.data';

@Component()
// tslint:disable-next-line
export class PetOwnerService {
  private readonly petOwners: IPetOwner[] = dummyPetOwner;

  create(petOwner: IPetOwner) {

    const count = this.petOwners.length;
    const toPush = Object.assign({}, petOwner,
      {id: count});
    this.petOwners.push(toPush);
    return toPush;
  }

  findAll(): IPetOwner[] {
    return this.petOwners;
  }

  findOneById(id: number): IPetOwner {
    return this.petOwners.find(petOwner =>
      petOwner.id === id);
  }
}

import { Component } from '@nestjs/common';
import {IOwner, IPet, IPetOwner} from './interfaces/pet.interface';
import {dummyOwners, dummyPets, dummyPetOwner} from './dummy.data';

@Component()
// tslint:disable-next-line
export class PetsService {
  private readonly pets: IPet[] = dummyPets;

  create(pet: IPet) {

    const count = this.pets.length;
    const toPush = Object.assign({}, pet,
      {id: count});
    this.pets.push(toPush);
    return toPush;
  }

  update(id, pet) {

    const result = this.findOneById(id);
    console.log(result);
    const toPush = Object.assign({}, pet, result);
    this.pets.push(toPush);
    return result;
  }

  findAllPets(): IPet[] {
    return this.pets;
  }

  findOneById(id: number): IPet {
    return this.pets.find(pet => pet.id === id);
  }
}

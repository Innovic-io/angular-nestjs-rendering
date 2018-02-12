import { Component } from '@nestjs/common';
import { IPet } from '../interfaces/pet.interface';
import { dummyPets } from '../dummy.data';

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

  update(pet) {
    pet.id = +pet.id;

    const index = this.pets.findIndex((pets) => pets.id === pet.id);
    const result = this.findOneById(pet.id);

    this.pets[index] = Object.assign({}, result, pet);

    return result;
  }

  deletePet(id) {

    const index = this.pets.findIndex((pets) => pets.id === id);

    const [ removedItem ] = this.pets.splice(index, 1);

    return removedItem;
  }

  findAllPets(): IPet[] {
    return this.pets;
  }

  findOneById(id: number): IPet {
    return this.pets.find(pet => pet.id === id);
  }
}

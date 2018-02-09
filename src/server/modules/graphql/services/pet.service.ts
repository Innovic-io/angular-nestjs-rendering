import { Component } from '@nestjs/common';
import { IPet } from '../interfaces/pet.interface';
import {dummyPets} from '../dummy.data';

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

  findAll(): IPet[] {
    return this.pets;
  }

  findOneById(id: number): IPet {
    return this.pets.find(pet => pet.id === id);
  }
}

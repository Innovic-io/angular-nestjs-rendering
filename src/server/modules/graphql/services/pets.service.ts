import { Component, Inject } from '@nestjs/common';

import {  IPet} from '../interfaces/pet.interface';
import { dummyPets } from '../dummy.data';
import { DATABASE_TOKEN } from '../../database/database.constants';
import { IDatabase } from '../../database/interfaces/database.interface';

@Component()
// tslint:disable-next-line
export class PetsService {

  private readonly pets: IPet[] = dummyPets;

  constructor(@Inject(DATABASE_TOKEN) private readonly dbService: IDatabase) {}

  async create(pet) {

    const count = this.pets.length;
    const toPush = Object.assign({}, pet,
      {id: count, dateAdopted: new Date()});
    this.pets.push(toPush);

    const op = await this.dbService.collection('pets').insertOne(toPush);

    const [ addedPet ] = op.ops;

    return addedPet;
  }

  update(pet) {
    pet.id = +pet.id;

    const index = this.pets.findIndex((pets) => pets.id === pet.id);
    const result = this.findOneById(pet.id);

    if (pet.owners) {
     Object.assign(result, { owner: pet.owner });
    }

    this.pets[index] = Object.assign({}, result, pet);

    return result;
  }

  deletePet(id) {

    const index = this.pets.findIndex((pets) => pets.id === id);

    const [ removedItem ] = this.pets.splice(index, 1);

    return removedItem;
  }

  async findAllPets() {

    return await this.dbService.collection<IPet[]>('pets').find({}).toArray();
  }

  removeOwner(id: number | string): IPet {

     const index = this.pets.findIndex((singlePet) => singlePet.id === id);

     Object.assign(this.pets[index], {owner: null});

     return this.pets[index];
  }

  findOneById(id: number): IPet {
    return this.pets.find(pet => pet.id === id);
  }
}

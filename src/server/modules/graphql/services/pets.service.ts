import { Component } from '@nestjs/common';
import { IOwner, IPet, IPetSpecies } from '../interfaces/pet.interface';
import { dummyPets, dummySpecies } from '../dummy.data';

@Component()
// tslint:disable-next-line
export class PetsService {
  private readonly pets: IPet[] = dummyPets;

  create(pet) {
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

    if (pet.owners) {
     result.owners.push(pet.owners);
    }
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

  removeOwner(id: number | string, owner: IOwner): IPet {
     const currentPet = this.findOneById(+id);
     const index = this.pets.findIndex((singlePet) => singlePet.id === id);

     const ownerIndex = currentPet.owners.findIndex((petOwners) => petOwners.id === owner.id);
     this.pets[index].owners.slice(ownerIndex, 1);

     return this.pets[index];
  }
  findOneById(id: number): IPet {
    return this.pets.find(pet => pet.id === id);
  }
}

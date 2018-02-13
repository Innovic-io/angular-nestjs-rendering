import { Component } from '@nestjs/common';
import { IOwner, IPet } from '../interfaces/pet.interface';
import { dummyOwners } from '../dummy.data';

@Component()
// tslint:disable-next-line
export class OwnerService {
  private readonly owners: IOwner[] = dummyOwners;

  create(owners: IOwner) {

    const count = this.owners.length;
    const toPush = Object.assign({}, owners,
      {
        id: count,
        email: owners.email || 'N/A',
        mobile: owners.mobile || 'N/A',
      });
    this.owners.push(toPush);
    return toPush;
  }

  update(owner) {
    owner.id = +owner.id;

    const index = this.owners.findIndex((oneOwner) => oneOwner.id === owner.id);
    const result = this.findOneById(owner.id);

    this.owners[index] = Object.assign({}, result, owner);

    return result;
  }

  changeOwner(newOwnerID: number, pet: IPet) {
    const oldOwner = this.findOneById(pet.owner);
    const newOwner = this.findOneById(newOwnerID);

    oldOwner.pets.splice(
      oldOwner.pets.findIndex((singlePet) =>
        singlePet.id === pet.id),
      1);
    newOwner.pets.push(pet);
    return true;
  }
  findAll(): IOwner[] {
    return this.owners;
  }

  findOneById(id: number): IOwner {
    return this.owners.find(owners => owners.id === id);
  }
}

import { Component } from '@nestjs/common';
import { IOwner } from '../interfaces/pet.interface';
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

  findAll(): IOwner[] {
    return this.owners;
  }

  findOneById(id: number): IOwner {
    return this.owners.find(owners => owners.id === id);
  }
}

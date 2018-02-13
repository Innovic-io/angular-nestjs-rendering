import { Component, Inject } from '@nestjs/common';

import { IOwner, IPet } from '../interfaces/pet.interface';
import { DATABASE_TOKEN } from '../../database/database.constants';
import { IDatabase } from '../../database/interfaces/database.interface';
import { transferId } from './service.helper';

@Component()
// tslint:disable-next-line
export class OwnerService {

  private readonly collectionName = 'owners';
  constructor(@Inject(DATABASE_TOKEN) private readonly dbService: IDatabase) {}

  async create(owner) {

    const toPush = Object.assign({}, owner,
      {
        email: owner.email || 'N/A',
        mobile: owner.mobile || 'N/A',
        pets: [],
      });

    const op = await this.dbService.collection(this.collectionName).insertOne(toPush);

    const [ addedOwner ] = op.ops;

    return addedOwner;
  }

  async update(owner): Promise<IOwner> {

    await this.dbService
      .collection(this.collectionName)
      .findOneAndUpdate({_id: transferId(owner._id)}, owner);

    return owner;
  }

  async changeOwner(newOwnerID: string, pet: IPet) {
    const oldOwner = await this.findOneById(pet.owner);
    const newOwner = await this.findOneById(newOwnerID);

    oldOwner.pets.splice(
      oldOwner.pets.findIndex((singlePet) =>
        singlePet.id === pet.id),
      1);
    await this.dbService
      .collection(this.collectionName)
      .findOneAndUpdate({_id: oldOwner.id}, oldOwner);

    newOwner.pets.push(pet);
    await this.dbService
      .collection(this.collectionName)
      .findOneAndUpdate({_id: newOwner.id}, newOwner);

    return true;
  }

  async deleteOwner(id: string): Promise<IOwner> {

    const currentPet = await this.findOneById(id);

    await  this.dbService
      .collection(this.collectionName)
      .findOneAndDelete({_id: transferId(id)});
    return currentPet;
  }

  async findAll() {

    return await this.dbService.collection<IOwner[]>(this.collectionName).find({}).toArray();
  }

  async findOneById(id: string): Promise<IOwner> {

    return await this.dbService
      .collection<IOwner>(this.collectionName)
      .findOne({ _id: transferId(id) });
  }
}

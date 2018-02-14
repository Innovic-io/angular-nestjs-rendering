import { Component, Inject } from '@nestjs/common';
import { Collection } from 'mongodb';
import { ObjectID } from 'bson';

import { IOwner, IPet } from '../interfaces/pet.interface';
import { DATABASE_TOKEN } from '../../database/database.constants';
import { IDatabase } from '../../database/interfaces/database.interface';
import { createObjectID } from './service.helper';

@Component()
// tslint:disable-next-line
export class OwnerService {

  private readonly collectionName = 'owners';
  private readonly collection: Collection;

  constructor(@Inject(DATABASE_TOKEN) private readonly dbService: IDatabase) {

    this.collection = this.dbService.collection(this.collectionName);
  }

  async create(owner) {

    const toPush = Object.assign({}, owner,
      {
        email: owner.email || 'N/A',
        mobile: owner.mobile || 'N/A',
        pets: [],
      });

    const op = await this.dbService.collection(this.collectionName).insertOne(toPush);

    const [addedOwner] = op.ops;

    return addedOwner;
  }

  async update(owner): Promise<IOwner> {

    await this.collection.findOneAndUpdate({ _id: createObjectID(owner._id) }, owner);

    return owner;
  }

  async changeOwner(petID: string, ownerID: string) {

    const oldOwner = await this.collection.findOne({ 'pets._id': createObjectID(petID) });

    const [pet] = oldOwner.pets;

    await this.removeFromOwner(oldOwner._id, pet);

    return this.addPetToOwner(ownerID, pet);
  }

  /**
   * Add new Pet to owner
   *
   * @param {IPet} pet
   * @returns {Promise<Promise<FindAndModifyWriteOpResultObject<Default>>>}
   */
  async addPet(pet: IPet) {

    const { owner } = pet;

    delete pet.owner;

    Object.assign(pet, {
      _id: new ObjectID()
    });

    return this.addPetToOwner(owner, pet);

  }

  private async addPetToOwner(owner: string, pet: IPet) {

    return this.collection.findOneAndUpdate({ _id: createObjectID(owner) }, {
      '$addToSet': { pets: pet },
    }, { returnOriginal: false });
  }

  private async removeFromOwner(owner: string, pet: IPet) {

    return this.collection.findOneAndUpdate({ _id: createObjectID(owner) }, {
      '$pull': { pets: pet },
    });
  }


  async deleteOwner(id: string): Promise<IOwner> {

    const currentPet = await this.findOneById(id);

    await  this.collection.findOneAndDelete({ _id: createObjectID(id) });
    return currentPet;
  }

  async findAll() {

    return await this.dbService.collection<IOwner[]>(this.collectionName).find({}).toArray();
  }

  async findOneById(id: string): Promise<IOwner> {

    if (id) {
      return this.collection.findOne({ _id: createObjectID(id) });
    }

    return null;
  }
}

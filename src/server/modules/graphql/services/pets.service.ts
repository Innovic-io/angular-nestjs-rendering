import { Component, Inject } from '@nestjs/common';

import {  IPet} from '../interfaces/pet.interface';
import { DATABASE_TOKEN } from '../../database/database.constants';
import { IDatabase } from '../../database/interfaces/database.interface';
import { transferId } from './service.helper';

@Component()
// tslint:disable-next-line
export class PetsService {

  private readonly collectionName = 'pets';
  constructor(@Inject(DATABASE_TOKEN) private readonly dbService: IDatabase) {}

  async create(pet) {

    const toPush = Object.assign({}, pet,
      {dateAdopted: new Date()});

    const op = await this.dbService.collection(this.collectionName).insertOne(toPush);

    const [ addedPet ] = op.ops;

    return addedPet;
  }

  async update(pet): Promise<IPet> {

   await this.dbService
      .collection(this.collectionName)
      .findOneAndUpdate({_id: transferId(pet._id)}, pet);

   return pet;
  }

  async deletePet(id: string): Promise<IPet> {

    const currentPet = await this.findOneById(id);

    await  this.dbService
      .collection(this.collectionName)
      .findOneAndDelete({_id: transferId(id)});
    return currentPet;
  }

  async findAllPets() {

    return await this.dbService.collection<IPet[]>(this.collectionName).find({}).toArray();
  }

  async removeOwner(id: string): Promise<IPet> {

    const currentPet = await this.findOneById(id);
    Object.assign(currentPet, {owner: null});

    return await this.update(currentPet);
  }

  async findOneById(id: string): Promise<IPet> {

    return await this.dbService
      .collection<IPet>(this.collectionName)
      .findOne({ _id: transferId(id) });
  }
}

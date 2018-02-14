import { UseGuards } from '@nestjs/common';
import { DelegateProperty, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MergeInfo } from 'graphql-tools/dist/Interfaces';

import { IOwner, IPet } from './interfaces/pet.interface';
import { PetsGuard } from './pets.guard';
import { OwnerService } from './services/owner.service';

@Resolver('Pet')
export class PetsResolvers {

  constructor(private readonly ownerService: OwnerService) {}

  @Query()
  @UseGuards(PetsGuard)
  async getOwners() {
    return await this.ownerService.findAll();
  }

  @Query()
  async getPetById(obj, { id }, context, info) {

    const result = await this.ownerService.findByPetId(id);

    if (!result) {
      return null;
    }
    const [ pet ] = result.pets;

    return pet;
  }

  @Query()
  async getOwnerById(obj, { id }, context, info) {

    return await this.ownerService.findOneById(id);
  }

  @Mutation()
  async createPet(obj, pet: IPet, context, info) {

    const owner = await this.ownerService.addPet(pet);

    return owner.value;
  }

  @Mutation()
  async updatePet(obj, pet: IPet, context, info) {

    return await this.ownerService.updatePet(pet);
  }

  @Mutation()
  async updatePetsOwner(obj, { petID, owner }, context, info) {

    const newOwner = await this.ownerService.changeOwner(petID, owner);

    return newOwner.value;
  }

  @Mutation()
  async deletePet(obj, { id }, context, info): Promise<IPet> {

    return await this.ownerService.deletePet(id);
  }

  @Mutation()
  async createOwner(obj, args: IOwner, context, info) {

    return await this.ownerService.create(args);
  }

  @Mutation()
  async updateOwner(obj, args: IOwner, context, info) {

    return await this.ownerService.update(args);
  }

  @Mutation()
  async deleteOwner(obj, { id }, context, info) {

    return await this.ownerService.deleteOwner(id);
  }

  // @TODO make one subscription
  @Subscription()
  async petAdded() {
    return {
      subscribe: () => {}
    };
  }

  // TODO find usefull example and implement it
  @DelegateProperty('human')
  findHumansById() {
    return (mergeInfo: MergeInfo) => ({
      fragment: `fragment CatFragment on Cat { humanId }`,
      resolve(parent, args, context, info) {
        const humanId = parent.id;
        return mergeInfo.delegate(
          'query',
          'humanById',
          {
            id: humanId,
          },
          context,
          info,
        );
      },
    });
  }
}

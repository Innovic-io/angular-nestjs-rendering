import { Req, UseGuards } from '@nestjs/common';
import { DelegateProperty, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MergeInfo } from 'graphql-tools/dist/Interfaces';
import { ApolloError } from 'apollo-client';

import { IOwner, IPet } from './interfaces/pet.interface';
import { PetsService } from './services/pets.service';
import { PetsGuard } from './pets.guard';
import { OwnerService } from './services/owner.service';

@Resolver('Pet')
export class PetsResolvers {

  constructor(private readonly petsService: PetsService,
              private readonly ownerService: OwnerService) {}

  @Query()
  @UseGuards(PetsGuard)
  async getPets() {
    return await this.petsService.findAllPets();
  }

  @Query()
  @UseGuards(PetsGuard)
  async getOwners() {
    return await this.ownerService.findAll();
  }

  @Query('getPetById')
  async findOnePetById(obj, { id }, context, info) {

    return await this.petsService.findOneById(id);
  }

  @Query('owner')
  async findOneOwnerById(obj, { id }, context, info) {

    return await this.ownerService.findOneById(id);
  }

  @Mutation('createPet')
  async createPet(obj, pet: IPet, context, info) {

    const owner = await this.ownerService.addPet(pet);

    return owner.value;
  }

  @Mutation('updatePet')
  async updatePet(obj, args: IPet, context, info) {

    if (!args._id) {
      throw new ApolloError({errorMessage: 'Bad id sent'});
    }

    return await this.petsService.update(args);
  }

  @Mutation('deletePet')
  async deletePet(obj, args, context, info) {

    await this.petsService.removeOwner(args.id);

    return await this.petsService.deletePet(args.id);
  }

  @Mutation('changePetOwner')
  async updatePetsOwner(obj, { petID, owner }, context, info) {

    const newOwner = await this.ownerService.changeOwner(petID, owner);

    return newOwner.value;
  }

  @Mutation('removeOwnerFromPet')
  async removeOwnerFromPet(obj, args, context, info) {

    return await this.petsService.removeOwner(args.id);
  }

  @Mutation('createOwner')
  async createOwner(obj, args: IOwner, context, info) {

    return await this.ownerService.create(args);
  }

  @Mutation('updateOwner')
  async updateOwner(obj, args: IOwner, context, info) {

    return await this.ownerService.update(args);
  }

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

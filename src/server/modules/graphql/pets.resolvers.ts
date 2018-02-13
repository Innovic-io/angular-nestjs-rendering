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

  @Query('pet')
  async findOnePetById(query: { id: string | number }, @Req() request?) {

    return await this.petsService.findOneById(+query.id);
  }

  @Query('owner')
  async findOneOwnerById(query: { id: string | number }, @Req() request?) {

    return await this.ownerService.findOneById(+query.id);
  }

  @Mutation('createPet')
  async createPet(obj, args: IPet, context, info) {
    let owner;

    if (!!args.owner) {
      owner = await this.ownerService.findOneById(+args.owner);
      if (!owner) {
        throw new ApolloError({networkError: new Error('Owner does not exist')});
      }
    }

    const newPet = await this.petsService.create(args);

    if (owner) {

      Object.assign(owner, { pets: owner.pets.concat(newPet) });
      await this.ownerService.update(owner);
    }

    return newPet;
  }

  @Mutation('updatePet')
  async updatePet(obj, args: IPet, context, info) {

    return await this.petsService.update(args);
  }

  @Mutation('deletePet')
  async deletePet(obj, args, context, info) {

    return await this.petsService.deletePet(+args.id);
  }

  @Mutation('changePetOwner')
  async updatePetsOwner(obj, args, context, info) {

    const currentPet = await this.petsService.findOneById(args.petID);
    this.ownerService.changeOwner(args.owner, currentPet);
    return await this.petsService.update(args);
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

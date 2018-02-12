import { Req, UseGuards } from '@nestjs/common';
import { DelegateProperty, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MergeInfo } from 'graphql-tools/dist/Interfaces';
import { ApolloError } from 'apollo-client';

import { IOwner, IPet, IPetSpecies } from './interfaces/pet.interface';
import { PetsService } from './services/pets.service';
import { PetsGuard } from './pets.guard';
import { OwnerService } from './services/owner.service';
import { dummySpecies } from './dummy.data';

@Resolver('Pet')
export class PetsResolvers {
  private species: IPetSpecies[] = dummySpecies;

  constructor(private readonly petsService: PetsService,
              private readonly ownerService: OwnerService) {
  }

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

    if (!args.owners) {
      const owner = this.ownerService.findOneById(+args.owners);
      Object.assign(args, { owners: [ owner ] });
    }

    return args; // await this.petsService.create(args);
  }

  @Mutation('updatePet')
  async updatePet(obj, args: IPet, context, info) {

    return await this.petsService.update(args);
  }

  @Mutation('deletePet')
  async deletePet(obj, args, context, info) {

    return await this.petsService.deletePet(+args.id);
  }

  @Mutation('addOwnerToPet')
  async updatePetsOwner(obj, args, context, info) {

    const updateObject = {
      id: args.id,
      owners: args.owners,
    };

    return await this.petsService.update(updateObject);
  }

  @Mutation('removeOwnerFromPet')
  async removeOwnerFromPet(obj, args, context, info) {

    const owner = await this.ownerService.findOneById(args.owners.id);
    if (!owner) {

      throw new ApolloError({ networkError: Error('owner not exist') });
    }

    return await this.petsService.removeOwner(args.id, owner);
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

import { Req, UseGuards } from '@nestjs/common';
import { DelegateProperty, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MergeInfo } from 'graphql-tools/dist/Interfaces';

import { IOwner, IPet } from './interfaces/pet.interface';
import { PetsService } from './services/pets.service';
import { PetsGuard } from './pets.guard';
import { OwnerService } from './services/owner.service';
import { PetOwnerService } from './services/petowner.service';

@Resolver('Pet')
export class PetsResolvers {
  constructor(private readonly petsService: PetsService,
              private readonly ownerService: OwnerService,
              private readonly petOwnerService: PetOwnerService) {
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
  async findOnePetById(query: { id: string | number}, @Req() request?) {

    return await this.petsService.findOneById(+query.id);
  }

  @Query('owner')
  async findOneOwnerById(query: { id: string | number}, @Req() request?) {

    return await this.ownerService.findOneById(+query.id);
  }

  @Query('petOwner')
  async findOnePetOwnerById(query: { id: string | number}, @Req() request?) {
    return await this.petOwnerService.findOneById(+query.id);
  }

  @Mutation('createPet')
  async createPet(obj, args: IPet, context, info) {

    return await this.petsService.create(args);
  }

  @Mutation('updatePet')
  async updatePet(obj, args: IPet, context, info) {

    return await this.petsService.update(args);
  }

  @Mutation('deletePet')
  async deletePet(obj, args, context, info) {

    return await this.petsService.deletePet(+args.id);
  }

  @Mutation('createOwner')
  async createOwner(obj, args: IOwner, context, info) {

    return await this.ownerService.create(args);
  }

  @Mutation('createPetOwnerById')
  async createPetOwner(obj, args, context, info) {

    const pet = await this.petsService.findOneById(+args.petID);
    const owner = await this.ownerService.findOneById(+args.ownerID);

    if (!pet || !owner) {
      throw new Error('Bad Request');
    }
    return await this.petOwnerService.create({ pet, owner });
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

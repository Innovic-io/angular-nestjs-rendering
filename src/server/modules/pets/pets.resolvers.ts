import { UseGuards } from '@nestjs/common';
import { DelegateProperty, Mutation, Query, ResolveProperty, Resolver, Subscription } from '@nestjs/graphql';
import { MergeInfo } from 'graphql-tools/dist/Interfaces';
import { PubSub } from 'graphql-subscriptions';

import { IAccount, IOwner, IPet } from './interfaces/pet.interface';
import { PetsGuard } from './pets.guard';
import { OwnerService } from './services/owner.service';
import { dummyAccount } from './dummy.data';
import { ApolloError } from 'apollo-client';
import { ObjectID } from 'bson';
import { WRONG_ID_ERROR } from './pets.constants';

const ownerSubscription = new PubSub();

@Resolver('Owner')
export class PetsResolvers {

  private bankAccount: IAccount[] = dummyAccount;

  constructor(private readonly ownerService: OwnerService) {}

  @Query()
  @UseGuards(PetsGuard)
  async getOwners() {
    return await this.ownerService.findAll();
  }

  @Query()
  async getPetById(obj, { id }, context?, info?) {

    if (!ObjectID.isValid(id)) {
      throw new ApolloError(WRONG_ID_ERROR);
    }

    const result = await this.ownerService.findByPetId(id);

    if (!result) {
      return null;
    }
    const [ pet ] = result.pets;

    return pet;
  }

  @Query()
  async getOwnerById(obj, { id }, context?, info?) {

    if (!ObjectID.isValid(id)) {

      throw new ApolloError(WRONG_ID_ERROR);
    }

    return await this.ownerService.findOneById(id);
  }

  /**
   * Create new Pet
   *
   * @param obj
   * @param {IPet} pet
   * @param context?
   * @param info?
   * @returns {Promise<any>}
   */
  @Mutation()
  async createPet(obj, pet: IPet, context?, info?) {

    if (!ObjectID.isValid(pet.owner)) {

      throw new ApolloError(WRONG_ID_ERROR);
    }

    const owner = await this.ownerService.addPet(pet);

    return owner.value;
  }

  /**
   * Update Pet data
   *
   * @param obj
   * @param {IPet} pet
   * @param context?
   * @param info?
   * @returns {Promise<Default | undefined>}
   */
  @Mutation()
  async updatePet(obj, pet: IPet, context?, info?) {

    if (!ObjectID.isValid(pet._id) || !ObjectID.isValid(pet.owner)) {
      throw new ApolloError(WRONG_ID_ERROR);
    }

    return await this.ownerService.updatePet(pet);
  }

  /**
   * Change Pets Owner
   *
   * @param obj
   * @param {any} petID
   * @param {any} owner
   * @param context?
   * @param info?
   * @returns {Promise<any>}
   */
  @Mutation()
  async updatePetsOwner(obj, { petID, owner }, context?, info?) {

    if (!ObjectID.isValid(owner) || !ObjectID.isValid(petID)) {

      throw new ApolloError(WRONG_ID_ERROR);
    }

    const newOwner = await this.ownerService.changeOwner(petID, owner);

    return newOwner.value;
  }

  /**
   * remove Pet from Owner
   *
   * @param obj
   * @param {any} id
   * @param context?
   * @param info?
   * @returns {Promise<IPet>}
   */
  @Mutation()
  async deletePet(obj, { id }, context?, info?): Promise<IPet> {

    if (!ObjectID.isValid(id)) {

      throw new ApolloError(WRONG_ID_ERROR);
    }

    return await this.ownerService.deletePet(id);
  }

  /**
   * Create new Owner
   *
   * @param obj
   * @param {IOwner} args
   * @param context?
   * @param info?
   * @returns {Promise<any>}
   */
  @Mutation()
  async createOwner(obj, args: IOwner, context?, info?) {

    return await this.ownerService.create(args);
  }

  /**
   * Update Owner data
   *
   * @param obj
   * @param {IOwner} args
   * @param context?
   * @param info?
   * @returns {Promise<IOwner>}
   */
  @Mutation()
  async updateOwner(obj, args: IOwner, context?, info?) {

    if (!ObjectID.isValid(args.id)) {

      throw new ApolloError(WRONG_ID_ERROR);
    }

    return await this.ownerService.update(args);
  }

  /**
   * Delete Owner from DB
   *
   * @param obj
   * @param {any} id
   * @param context?
   * @param info?
   * @returns {Promise<Default | undefined>}
   */
  @Mutation()
  async deleteOwner(obj, { id }, context?, info?) {

    if (!ObjectID.isValid(id)) {

      throw new ApolloError(WRONG_ID_ERROR);
    }

    return await this.ownerService.deleteOwner(id);
  }

  /**
   * Get Owners account
   *
   * @NOTICE: For this to work account must be part of
   *    Resolver(NAME) type in types.graphql
   *
   * @param {any} _id
   * @returns {Promise<IAccount[]>}
   */
  @ResolveProperty('account')
  async getOwnersAccount({ _id }): Promise<IAccount[]> {

    return await this.bankAccount
      .filter((account) => account.ownerId.equals(_id));

  }

  // TODO this need improvement
  // not sure is it right
  @Subscription('dateChanged')
  async dateChanged(obj, args, context, info) {

    return {

      subscribe: () => {

        return ownerSubscription.asyncIterator('dateChanged');
      },
    };
  }

  @DelegateProperty('chirps')
  findChirpsByUserId() {
    return (mergeInfo: MergeInfo) => ({
      fragment: `fragment OwnerFragment on Owner { id }`,
      resolve(parent, args, context?, info?) {

        const ownerId = parent._id;
        return mergeInfo.delegate(
          'query',
          'chirpsByOwnerId',
          {
            ownerId,
          },
          context,
          info,
        );
      },
    });
  }
}

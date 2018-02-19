import { UseGuards } from '@nestjs/common';
import { DelegateProperty, Mutation, Query, ResolveProperty, Resolver, Subscription } from '@nestjs/graphql';
import { MergeInfo } from 'graphql-tools/dist/Interfaces';
import { PubSub } from 'graphql-subscriptions';

import { IAccount, IOwner, IPet } from './interfaces/pet.interface';
import { PetsGuard } from './pets.guard';
import { OwnerService } from './services/owner.service';
import { dummyAccount } from './dummy.data';
import { ApolloError } from 'apollo-client';
import { ObjectID } from 'mongodb';
import { WRONG_ID_ERROR } from './pets.constants';
import { createObjectID } from './services/service.helper';

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
  async getPetById(obj, { _id }, context?, info?) {

    if (!ObjectID.isValid(_id)) {
      throw new ApolloError(WRONG_ID_ERROR);
    }

    const result = await this.ownerService.findByPetId(_id);

    if (!result) {
      return null;
    }
    const [ pet ] = result.pets;

    return pet;
  }

  @Query()
  async getOwnerById(obj, { _id }, context?, info?) {

    if (!ObjectID.isValid(_id)) {

      throw new ApolloError(WRONG_ID_ERROR);
    }

    return await this.ownerService.findOneById(_id);
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
   * @param {any} _id
   * @param context?
   * @param info?
   * @returns {Promise<IPet>}
   */
  @Mutation()
  async deletePet(obj, { _id }, context?, info?): Promise<IPet> {

    if (!ObjectID.isValid(_id)) {

      throw new ApolloError(WRONG_ID_ERROR);
    }

    return await this.ownerService.deletePet(_id);
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

    if (!ObjectID.isValid(args._id)) {

      throw new ApolloError(WRONG_ID_ERROR);
    }

    return await this.ownerService.update(args);
  }

  /**
   * Delete Owner from DB
   *
   * @param obj
   * @param {any} _id
   * @param context?
   * @param info?
   * @returns {Promise<Default | undefined>}
   */
  @Mutation()
  async deleteOwner(obj, { _id }, context?, info?) {

    if (!ObjectID.isValid(_id)) {

      throw new ApolloError(WRONG_ID_ERROR);
    }

    return await this.ownerService.deleteOwner(_id);
  }

  @Mutation()
  async addAccountToOwner(obj, { ownerId, amount}) {

    const owner = await this.getOwnerById(obj, {_id: ownerId});

    const newBankAccount: IAccount = { _id: createObjectID(), ownerId: owner._id, amount };

    this.bankAccount.push(newBankAccount);

    return newBankAccount;
  }

  @Mutation()
  async uploadProfilePicture(root, { id, files }, context) {
    // you can now access files parameter from variables
    // console.log('uploadProfilePicture', { id, files });
    return files.toString();
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

      subscribe: async () => {

        return await ownerSubscription.asyncIterator('dateChanged');
      },
    };
  }

  @DelegateProperty('chirps')
  findChirpsByUserId() {
    return (mergeInfo: MergeInfo) => ({
      fragment: `fragment OwnerFragment on Owner { _id }`,
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

import { IOwner, IPet, IPetSpecies, SpeciesTypeEnum, } from './interfaces/pet.interface';

export const dummyOwners: IOwner[] = [
  {
    id: 0,
    first_name: 'Goran',
    last_name: 'Visnjic',
    email: 'N/A',
    mobile: 'N/A',
    pets: [],
  },
  {
    id: 1,
    first_name: 'Milan',
    last_name: 'Milanic',
    email: 'milan@milanic.com',
    mobile: 'N/A',
    pets: [],
  },
];

export const dummySpecies: IPetSpecies[] = [{ speciesName: 'cat', speciesType: SpeciesTypeEnum.MAMMAL }];

export const dummyPets: IPet[] = [];

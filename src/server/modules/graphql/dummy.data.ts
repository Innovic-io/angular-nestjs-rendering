import { IOwner, IPet, IPetSpecies } from './interfaces/pet.interface';

export const dummyOwners: IOwner[] = [
  {
    id: 0,
    first_name: 'Goran',
    last_name: 'Visnjic',
    email: 'N/A',
    mobile: 'N/A',
  },
  {
    id: 0,
    first_name: 'Milan',
    last_name: 'Milanic',
    email: 'milan@milanic.com',
    mobile: 'N/A',
  },
];

export const dummySpecies: IPetSpecies[] = [{
  id: 0,
  speciesName: 'cat',
}];

export const dummyPets: IPet[] = [
  { id: 0,
    name: 'Tom',
    age: 5,
    species: dummySpecies[0],
    owners: [dummyOwners[0]],
  },
];

import {IOwner, IPet, IPetOwner} from './interfaces/pet.interface';

export const dummyOwners: IOwner[] = [
  {
    id: 0,
    first_name: 'Goran',
    last_name: 'Visnjic',
    email: 'N/A',
    mobile: 'N/A',
  },
];

export const dummyPets: IPet[] = [
  { id: 0, name: 'Tom', age: 5, species: 'cat'},
];

export const dummyPetOwner: IPetOwner[] = [
  { id: 0, owner: dummyOwners[0], pet: dummyPets[0] },
];

export interface IPet {
  _id: string;
  name: string;
  age: number;
  species: IPetSpecies;
  owner?: string;
  dateAdopted: Date;
}

export enum SpeciesTypeEnum { BIRD, MAMMAL, BUG, FISH }
export interface  IPetSpecies {
  readonly speciesName: string;
  readonly speciesFamily?: string;
  readonly speciesType: SpeciesTypeEnum;
}

export interface  IOwner {
  readonly id?: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly mobile?: string;
  readonly email?: string;
  readonly pets?: IPet[];
}

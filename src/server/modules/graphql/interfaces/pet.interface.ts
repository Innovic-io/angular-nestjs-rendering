export interface IPet {
  readonly id?: number;
  readonly name: string;
  readonly age: number;
  readonly species: IPetSpecies;
  readonly owners?: IOwner[];
}

export interface  IPetSpecies {
  readonly id?: number;
  readonly speciesName: string;
}

export interface  IOwner {
  readonly id?: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly mobile?: string;
  readonly email?: string;
  readonly pets?: IPet[];
}

export interface IPet {
  readonly id?: number;
  readonly name: string;
  readonly age: number;
  readonly species: string;
}

export interface  IPetSpecies {
  readonly id?: number;
  readonly speciesName: string;
}

export interface  IOwner {
  readonly id?: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly mobile: string;
  readonly email: string;
}

export interface  IPetOwner {
  readonly id?: number;
  readonly pet: IPet;
  readonly owner: IOwner;
}

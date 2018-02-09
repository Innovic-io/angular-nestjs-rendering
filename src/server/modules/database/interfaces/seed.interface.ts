export interface ISeedObject {
  [ collectionName: string ]: {
    insertedCount: number;
    insertedItems: object[];
  };
}

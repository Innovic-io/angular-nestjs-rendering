
export const linkTypeDefs = `
  extend type Owner {
    chirps: [Chirp]
  }

  extend type Chirp {
    owner: Owner
  }
`;

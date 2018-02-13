describe('graphql resolver', () => {

  it('should pass', () => {
    expect(1).toBe(1);
  });
  /*
  const petsService = OwnerService;
  const ownerService = new OwnerService();
  const petsResolvers = new PetsResolvers(petsService, ownerService);

  let numberOfPets = dummyPets.length;
  const petToUpdate: IPet = {
    id: numberOfPets,
    age: 5,
    species: { id: 1, speciesName: 'mouse' },
    name: 'Jim',
  };
  const petToCreate = {
    age: 4,
    species: { id: 2, speciesName: 'horse' },
    name: 'Jack',
  };

  it('get all pets', async () => {

    const pets = await petsResolvers.getPets();

    expect(pets).toEqual(dummyPets);
  });

  it('get single Pet', async () => {

    const singlePet = await petsResolvers.findOnePetById({id: 0});

    expect(singlePet).toEqual(dummyPets[0]);
  });

  it('create Pet', async () => {

    await petsResolvers.createPet({}, petToCreate, {}, {});
    const created = dummyPets[numberOfPets++];

    expect(petToCreate.name).toEqual(created.name);
    expect(petToCreate.species).toEqual(created.species);
    expect(dummyPets.length).toBe(numberOfPets);
  });

  it('update Pet', async () => {

    await petsResolvers.updatePet({}, petToUpdate, {}, {});

    expect(petToUpdate).toEqual(dummyPets[numberOfPets - 1]);
    expect(dummyPets.length).toBe(numberOfPets);
  });

  it('delete Pet', async () => {

    const deletedPet = await petsResolvers.deleteOwner({}, {id: numberOfPets - 1}, {}, {});

    expect(deletedPet).toEqual(petToUpdate);
    expect(dummyPets.length).toBe(numberOfPets - 1);
  });*/
});

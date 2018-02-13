# Angular NestJS Server Rendering

- src/client <-- Angular 5+
- src/server <-- NestJS
- src/shared <-- Shared between apps

 <a href="https://angular.io" target="blank"><img height="155px" src="https://angular.io/assets/images/logos/angular/angular.svg" /></a>
 <a href="http://nestjs.com/" target="blank"><img height="155px" src="http://kamilmysliwiec.com/public/nest-logo.png#1" alt="Nest Logo" /></a>
  
### Included

- REST API
- WebSockets  
  
### Install

```bash
npm install
```

### Development

* Development port is on: 4200 ( inherited from angular-cli )

*In development, every controller ( route ) from NestJS must be mapped in proxy.conf.json*

```bash
npm start

docker-compose up
```

### Production

* Production port is specified in .env ( default to 5400 )

```bash
npm run build:universal
```

```bash

# test production

npm run serve:universal
```

###Working examples
 get all pets
 ```
 {
   getPets{
    _id
    name
    species { speciesName }
  }
}
```

create single Pet
```
mutation {
     createPet(name: "Rex", 
       species: { speciesName: "dog", speciesType: MAMMAL }) {
       _id
       name
       species { speciesName }
     }
   }
```

Create Owner
```
mutation {
   createOwner(
    first_name: "Milan", 
  	last_name: "Milanic",
    mobile: "066/422-22"
  ) {
    first_name
    mobile
    email  
  } 
}

```

Change Pet Owner
```
mutation {
   changePetOwner(petID: {{PetID}}, owner: {{ownerID}}){
    _id
    name
    species { speciesName }
    owner
  }
}
```
Delete Pet
```
 mutation {
   deletePet(
    id: {{PetID}} ) {
    _id
    name
    species { speciesName, speciesFamily }
    owner
  }
}
```

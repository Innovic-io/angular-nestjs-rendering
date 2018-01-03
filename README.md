# Angular NestJS Server Rendering

- src/client <-- Angular 5+
- src/server <-- NestJS
- src/shared <-- Shared between apps

 <a href="https://angular.io" target="blank"><img height="155px" src="https://angular.io/assets/images/logos/angular/angular.svg" /></a>
 <a href="http://nestjs.com/" target="blank"><img height="155px" src="http://kamilmysliwiec.com/public/nest-logo.png#1" alt="Nest Logo" /></a>
  
### Install

```bash
npm install
```

### Development

* Development port is on: 4200 ( inherited from angular-cli )

*In development, every controller ( route ) from NestJS must be mapped in proxy.conf.json*

```bash
npm start
```

### Production

* Production port is specified in .env ( default to 5400 )

```bash
npm run prod:build
```

```bash

# test production

npm run prod:server
```

### ToDo

- Server side linting
- Unit tests on server Code
- e2e tests

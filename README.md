# Angular NestJS Universal ( Server Rendering )

- src/client <-- Angular 5+
- src/server <-- NestJS
- src/shared <-- Shared between apps

 <a href="https://angular.io" target="blank"><img height="155px" src="https://angular.io/assets/images/logos/angular/angular.svg" /></a>
 <a href="http://nestjs.com/" target="blank"><img height="155px" src="http://kamilmysliwiec.com/public/nest-logo.png#1" alt="Nest Logo" /></a>

<table style="border: 0">
  <tr>
    <td><img width="200" src="http://innovic.io/assets/logo-small.png" /></td>
    <td>
      <ul>
        <li>INNOVIC doo</li>
        <li>Software consulting company for building full stack solutions.</li>
        <li>Proficient in: NodeJS, TypeScript, Angular, MongoDB... &lt;any&gt;.js library :)</li>
        <li><b>You have project for us? hello@innovic.io</b></li>
      </ul>
    </td>
  </tr>
</table>
  
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

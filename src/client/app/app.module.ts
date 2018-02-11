import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PingService } from './shared/services/ping.services';

const config: SocketIoConfig = { url: 'http://localhost:5400', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'nestJS' }),
    HttpClientModule,
    SocketIoModule.forRoot(config),
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
    })
  ],
  providers: [
    PingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(apollo: Apollo, httpLink: HttpLink) {

    apollo.create({
      link: httpLink.create({ uri: '/graphql' }),
      cache: new InMemoryCache()
    });
  }
}


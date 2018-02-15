import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { PingService } from './shared/services/ping.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  pongMessage$: Observable<any>;
  pets$: Observable<any>;

  constructor(private pingService: PingService, private apollo: Apollo) {}

  ping() {
    this.pingService.sendPing(new Date());
  }

  ngOnInit() {

    this.pets$ = this.apollo.query({query: gql`{ getOwners {  _id
        first_name
        last_name
        pets {
          name
          age
          _id
        }
        email
        account {
          id
          amount
        }  } }`});

    this.pongMessage$ = this.pingService.getPong();
  }
}

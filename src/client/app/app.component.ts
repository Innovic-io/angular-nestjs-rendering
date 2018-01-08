import { Component, OnInit } from '@angular/core';
import { PingService } from './shared/services/ping.services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  pongMessage$: Observable<any>;

  constructor(private pingService: PingService) {}

  ping() {
    this.pingService.sendPing(new Date());
  }

  ngOnInit() {

    this.pongMessage$ = this.pingService.getPong();
  }
}

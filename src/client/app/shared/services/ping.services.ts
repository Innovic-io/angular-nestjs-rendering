import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

import 'rxjs/add/operator/map';

@Injectable()
export class PingService {

  constructor(private socket: Socket) { }

  sendPing(date: Date) {
    this.socket.emit('events', date);
  }

  getPong() {

    return this.socket.fromEvent('events');
  }
}

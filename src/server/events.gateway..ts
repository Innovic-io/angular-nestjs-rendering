import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse
} from '@nestjs/websockets';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection {
  afterInit(server: any): any {
    return undefined;
  }

  handleConnection(client: any): any {
    return undefined;
  }

  @SubscribeMessage('events')
  onEvent(client, data): WsResponse<any> {
    const event = 'events';

    const response = {
      ping: data,
      pong: new Date()
    };

    return { event, data: response };
  }
}

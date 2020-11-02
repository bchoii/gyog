import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { uuid } from '../../../../../../main/src/utils';
import { SocketService } from './SocketService';

@WebSocketGateway({ namespace: 'wsnamespace1' })
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private service: SocketService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('channel1')
  // @UseGuards(SessionGuard)
  channel1(@MessageBody() data: string): string {
    console.log('Gateway.channel1', data);
    this.server.emit('channel2', uuid());
    return uuid();
  }

  afterInit(server: Server) {
    this.service.server = server;

    setInterval(() => {
      this.server.emit('channel2', uuid());
    }, 10000);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);

    setTimeout(() => {
      client.emit('channel2', 'Connected');
    }, 0);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}

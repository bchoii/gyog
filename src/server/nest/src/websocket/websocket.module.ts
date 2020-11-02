import { Module } from '@nestjs/common';
import { SocketService } from './SocketService';
import { WebsocketGateway } from './WebsocketGateway';

// https://stackoverflow.com/questions/54245541/how-to-access-websocket-from-controller-or-another-component-services
@Module({
  providers: [WebsocketGateway, SocketService],
  exports: [SocketService],
})
export class WebsocketModule {}

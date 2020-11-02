import { Module } from '@nestjs/common';
import { WebsocketModule } from '../../websocket/websocket.module';
import { CrudModule } from '../api/crud/crud.module';
import { AgentController } from './agent.controller';

@Module({
  controllers: [AgentController],
  imports: [CrudModule, WebsocketModule],
})
export class AgentModule {}

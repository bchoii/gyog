import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QueueStatus } from '../../../entities2/Queue';
import { RoleGuard } from '../../util/RoleGuard';
import { SessionGuard } from '../../util/SessionGuard';
import { XsrfGuard } from '../../util/XsrfGuard';
import { SocketService } from '../../websocket/SocketService';
import { CrudService } from '../api/crud/crud.service';

@Controller('agent')
@UseGuards(SessionGuard, new RoleGuard(['Verified', 'Queue']))
export class AgentController {
  constructor(
    private readonly crudService: CrudService,
    private readonly socket: SocketService,
  ) {}

  @Get('*')
  get() {
    throw new NotFoundException();
  }

  @Post('call')
  @UseGuards(XsrfGuard)
  async call(@Body() body) {
    body.status = QueueStatus.Open;
    const updated = await this.crudService.update('queue', body.id, body);
    this.socket.server.emit('channel2', updated.code);
    return updated;
  }

  @Post('close')
  @UseGuards(XsrfGuard)
  async close(@Body() body) {
    body.status = QueueStatus.Closed;
    const updated = await this.crudService.update('queue', body.id, body);
    return updated;
  }
}

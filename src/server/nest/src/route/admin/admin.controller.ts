import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../../util/RoleGuard';
import { SessionGuard } from '../../util/SessionGuard';

@Controller('admin')
@UseGuards(SessionGuard, new RoleGuard(['Verified']))
export class AdminController {
  @Get('*')
  get() {
    throw new NotFoundException();
  }
}

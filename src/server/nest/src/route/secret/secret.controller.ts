import {
  Controller,
  Get,
  NotFoundException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SessionGuard } from '../../util/SessionGuard';
import { XsrfGuard } from '../../util/XsrfGuard';

@Controller('secret')
@UseGuards(XsrfGuard, SessionGuard)
export class SecretController {
  @Get('*')
  get(@Request() request) {
    throw new NotFoundException();
  }
}

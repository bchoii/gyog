import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { uuid } from '../../../../../../../main/src/utils';
import { SessionGuard } from '../../util/SessionGuard';
import { XsrfGuard } from '../../util/XsrfGuard';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('')
  get() {
    return { api: uuid() };
  }

  @Get('self')
  @UseGuards(XsrfGuard, SessionGuard)
  self(@Request() request) {
    return request.user;
  }

  // @Get('next/:code')
  // @UseGuards(XsrfGuard)
  // next(@Param('code') code) {
  //   return this.apiService.next(code);
  // }
}

import { QueryOrder } from '@mikro-orm/core';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from '../../../../util/RoleGuard';
import { SessionGuard } from '../../../../util/SessionGuard';
import { XsrfGuard } from '../../../../util/XsrfGuard';
import { CrudService } from '../crud.service';

@Controller('api/crud/patient')
export class PatientController {
  model = 'patient';

  constructor(private readonly crudService: CrudService) {}

  @Post('')
  @UseGuards(XsrfGuard, SessionGuard, new RoleGuard(['Bethesda']))
  async post(@Body() body) {
    return await this.crudService.save(this.model, body);
  }

  @Get('')
  @UseGuards(XsrfGuard, SessionGuard, new RoleGuard(['Bethesda']))
  async find(@Query('s') s = '{}', @Query('page') page = 0) {
    return await this.crudService.findAndCount(
      this.model,
      JSON.parse(s),
      page,
      { updated: QueryOrder.DESC },
    );
  }

  @Delete(':id')
  @UseGuards(XsrfGuard, SessionGuard, new RoleGuard(['Bethesda']))
  async delete(@Param('id') id) {
    return await this.crudService.remove(this.model, id);
  }
}

import { QueryOrder } from '@mikro-orm/core';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from '../../../util/RoleGuard';
import { SessionGuard } from '../../../util/SessionGuard';
import { XsrfGuard } from '../../../util/XsrfGuard';
import { CrudService } from './crud.service';

@Controller('api/crud')
@UseGuards(XsrfGuard, SessionGuard, new RoleGuard(['Administrator']))
export class CrudController {
  constructor(readonly crudService: CrudService) {}

  @Get(':model')
  async find(
    @Param('model') model: string,
    @Query('s') s = '{}',
    @Query('page') page = 0,
  ) {
    return await this.crudService.findAndCount(model, JSON.parse(s), page, {
      updated: QueryOrder.DESC,
    });
  }

  @Get(':model/:id')
  async get(@Param('model') model: string, @Param('id') id) {
    return await this.crudService.findById(model, id);
  }

  @Post(':model')
  async post(@Param('model') model: string, @Body() body) {
    return await this.crudService.save(model, body);
  }

  @Patch(':model/:id')
  async patch(@Param('model') model: string, @Param('id') id, @Body() body) {
    return await this.crudService.update(model, id, body);
  }

  @Delete(':model/:id')
  async delete(@Param('model') model: string, @Param('id') id) {
    return await this.crudService.remove(model, id);
  }
}

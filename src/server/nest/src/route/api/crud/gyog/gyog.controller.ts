import { QueryOrder } from '@mikro-orm/core';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { CrudService } from '../crud.service';

@Controller('api/crud')
export class GyogController {
  constructor(private readonly crudService: CrudService) {}

  @Get('category')
  async category(@Query('s') s = '{}', @Query('page') page = 0) {
    return await this.crudService.findAndCount(
      'category',
      JSON.parse(s),
      page,
      { updated: QueryOrder.DESC },
    );
  }

  @Get('product/:id')
  async get(@Param('id') id) {
    return await this.crudService.findById('product', id);
  }
}

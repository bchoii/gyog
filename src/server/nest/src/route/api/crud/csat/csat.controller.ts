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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { RoleGuard } from '../../../../util/RoleGuard';
import { sanitize } from '../../../../util/SanitationPipe';
import { SessionGuard } from '../../../../util/SessionGuard';
import { XsrfGuard } from '../../../../util/XsrfGuard';
import { CrudService } from '../crud.service';

const mask = s => s.slice(0, 2) + '********' + s.slice(-2);

class Dto {
  @IsOptional()
  @IsString()
  @Transform(sanitize)
  // @IsIn(['', 'Juthamad', 'Thida', 'Suttiwan', 'Ubonwan'])
  agent: string;

  @IsOptional()
  @IsString()
  @Transform(sanitize)
  contact: string;

  @IsString()
  @IsIn(['excellent', 'good', 'average', 'bad', 'terrible'])
  rating: string;

  @IsOptional()
  @IsString()
  @IsIn(['cleanliness', 'waitingtime', 'servicequality', 'others'])
  details: string;
}

@Controller('api/crud/csat')
export class CsatController {
  model = 'csat';

  constructor(private readonly crudService: CrudService) {}

  @Post('')
  @UseGuards(XsrfGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() body: Dto) {
    return await this.crudService.save(this.model, body);
  }

  @Get('')
  @UseGuards(XsrfGuard, SessionGuard, new RoleGuard(['Csat']))
  async find(@Query('s') s = '{}', @Query('page') page = 0) {
    const result = (await this.crudService.findAndCount(
      this.model,
      JSON.parse(s),
      page,
      { updated: QueryOrder.DESC },
    )) as any;
    for (const csat of result.data) {
      csat.contact = mask(csat.contact);
    }
    return result;
  }

  @Delete(':id')
  @UseGuards(XsrfGuard, SessionGuard, new RoleGuard(['Csat']))
  async delete(@Param('id') id) {
    return await this.crudService.remove(this.model, id);
  }
}

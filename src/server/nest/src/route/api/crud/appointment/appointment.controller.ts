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
import { RoleGuard } from '../../../../util/RoleGuard';
import { sanitize } from '../../../../util/SanitationPipe';
import { SessionGuard } from '../../../../util/SessionGuard';
import { XsrfGuard } from '../../../../util/XsrfGuard';
import { CounterService } from '../../counter/counter.service';
import { CrudService } from '../crud.service';

class Dto {
  @Transform(sanitize)
  contact: string;

  @Transform(sanitize)
  name: string;
}

@Controller('api/crud/appointment')
export class AppointmentController {
  model = 'appointment';

  constructor(
    private readonly crudService: CrudService,
    private readonly counterService: CounterService,
  ) {}

  @Post('')
  @UseGuards(XsrfGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() body: Dto) {
    const next = await this.counterService.next('appointment');
    const code = 'A' + next.toString().padStart(3, '0');
    return await this.crudService.save(this.model, { ...body, code });
  }

  @Get('')
  @UseGuards(XsrfGuard, SessionGuard, new RoleGuard(['Appointment']))
  async find(@Query('s') s = '{}', @Query('page') page = 0) {
    return await this.crudService.findAndCount(
      this.model,
      JSON.parse(s),
      page,
      { updated: QueryOrder.DESC },
    );
  }

  @Delete(':id')
  @UseGuards(XsrfGuard, SessionGuard, new RoleGuard(['Appointment']))
  async delete(@Param('id') id) {
    return await this.crudService.remove(this.model, id);
  }
}

import { QueryOrder } from '@mikro-orm/core';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Transform } from 'class-transformer';
import { renderDate } from '../../../../../../../../../main/src/utils';
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
  purpose: string;
}

@Controller('api/crud/queue')
export class QueueController {
  model = 'queue';

  constructor(
    private readonly crudService: CrudService,
    private readonly counterService: CounterService,
  ) {}

  @Post('')
  @UseGuards(XsrfGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() body: Dto) {
    const prefix = body.purpose.slice(0, 2).toUpperCase();
    const next = await this.counterService.next(
      ['queue', prefix, renderDate(new Date())].join(),
    );
    const code = 'Q' + prefix + next.toString().padStart(3, '0');
    const result = await this.crudService.save(this.model, {
      code,
      queuetime: new Date(),
      ...body,
    });

    return result;
  }

  @Get('')
  @UseGuards(XsrfGuard, SessionGuard, new RoleGuard(['Queue']))
  async find(@Query('s') s = '{}', @Query('page') page = 0) {
    return await this.crudService.findAndCount(
      this.model,
      JSON.parse(s),
      page,
      { created: QueryOrder.ASC },
    );
  }
}

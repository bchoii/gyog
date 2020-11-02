import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IsEmail, IsString } from 'class-validator';
import { RoleGuard } from '../../../../util/RoleGuard';
import { SessionGuard } from '../../../../util/SessionGuard';
import { XsrfGuard } from '../../../../util/XsrfGuard';
import { CrudService } from '../crud.service';

class UserDto {
  @IsString()
  @IsEmail()
  email: string;
}

@Controller('api/crud/user')
@UseGuards(XsrfGuard, SessionGuard, new RoleGuard(['Administrator']))
export class UserController {
  model = 'user';

  constructor(private readonly crudService: CrudService) {}

  @Post('')
  async post(@Body() body: UserDto) {
    return await this.crudService.save(this.model, body);
  }

  @Patch(':id')
  async patch(@Param('id') id, @Body() body: UserDto) {
    return await this.crudService.update(this.model, id, body);
  }
}

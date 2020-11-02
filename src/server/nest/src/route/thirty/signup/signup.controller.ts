import { Body, Controller, Post, Render } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from '../../../../entities/User';

@Controller('thirty/signup')
export class SignupController {
  constructor(private readonly em: EntityManager) {}

  @Post('')
  @Render('thirty/signup/success')
  async post(@Body() body) {
    console.log('thirty , signup ', body);
    const entity = await this.em.save(User, body);
    return entity;
  }
}

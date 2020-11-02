import { Controller, Get, Query, Render, UsePipes } from '@nestjs/common';
import { SanitationPipe } from '../../util/SanitationPipe';

@Controller('message')
@UsePipes(SanitationPipe)
export class MessageController {
  @Get('')
  @Render('message')
  async message(@Query('text') text) {
    return { text };
  }
}

import { Body, Controller, Post } from '@nestjs/common';

@Controller('api/debug')
export class DebugController {
  @Post('')
  post(@Body() body) {
    console.log('DEBUG CONTROLLER');
    console.log({ body });
    return body;
  }

  // @Post('')
  // post(@Body() body, @PlainBody() text: string) {
  //   console.log({ body, text });
  //   return body;
  // }
}

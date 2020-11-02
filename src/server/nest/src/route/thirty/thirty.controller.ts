import { Controller } from '@nestjs/common';

@Controller('thirty')
export class ThirtyController {
  // @Get('*')
  // async page(@Req() request: Request, @Res() response: Response) {
  //   return response.render(('thirty/' + request.params[0]).replace(/\/$/, ''));
  // }
  // @Get('*')
  // any() {
  //   console.log('thirty, * ');
  //   throw new NotFoundException();
  // }
}

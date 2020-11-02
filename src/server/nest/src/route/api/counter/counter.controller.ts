import { Controller } from '@nestjs/common';
import { CounterService } from './counter.service';

@Controller('api/counter')
export class CounterController {
  constructor(readonly counterService: CounterService) {}

  // @Get(':name')
  // async next(@Param('name') name: string) {
  //   return { name, value: await this.counterService.next(name) };
  // }
}

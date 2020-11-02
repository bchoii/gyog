import { Module } from '@nestjs/common';
import { CounterController } from './counter.controller';
import { CounterService } from './counter.service';

@Module({
  providers: [CounterService,],
  controllers: [CounterController,],
  exports: [CounterService]
})
export class CounterModule { }

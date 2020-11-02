import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ChartModule } from './chart/chart.module';

@Module({
  imports: [ChartModule],
  controllers: [AdminController],
})
export class AdminModule { }

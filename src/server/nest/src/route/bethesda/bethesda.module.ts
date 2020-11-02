import { HttpModule, Module } from '@nestjs/common';
import { BethesdaController } from './bethesda.controller';
import { BethesdaService } from './bethesda.service';

@Module({
  imports: [HttpModule],
  providers: [BethesdaService],
  controllers: [BethesdaController],
})
export class BethesdaModule {}

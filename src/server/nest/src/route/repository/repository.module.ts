import { Module } from '@nestjs/common';
import { RepositoryController } from './repository.controller';
import { RepositoryService } from './repository.service';

@Module({
  providers: [
    RepositoryService,
  ],
  controllers: [
    RepositoryController,
  ],
})
export class RepositoryModule { }

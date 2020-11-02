import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { CounterModule } from './counter/counter.module';
import { CrudModule } from './crud/crud.module';
import { DebugController } from './debug/debug.controller';
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';
import { QrcodeController } from './qrcode/qrcode.controller';
import { ReportModule } from './report/report.module';
import { UploadModule } from './upload/upload.module';
import { VersionController } from './version/version.controller';

@Module({
  imports: [CounterModule, CrudModule, ReportModule, UploadModule],
  providers: [ApiService, ImageService],
  controllers: [
    ApiController,
    ImageController,
    DebugController,
    VersionController,
    QrcodeController,
  ],
})
export class ApiModule {}

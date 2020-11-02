import { Controller, Get, UseGuards } from '@nestjs/common';
import { XsrfGuard } from '../../../util/XsrfGuard';
import { version } from '../../../version.json';

@Controller('api/version')
@UseGuards(XsrfGuard)
export class VersionController {
  @Get('')
  version() {
    return { version };
  }
}

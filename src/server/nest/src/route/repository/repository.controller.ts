import {
  Controller,
  Get,
  NotFoundException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { readdirSync, statSync } from 'fs-extra';
import { join } from 'path';
import { RoleGuard } from '../../util/RoleGuard';
import { SessionGuard } from '../../util/SessionGuard';

@Controller('repository')
@UseGuards(SessionGuard, new RoleGuard(['Manager']))
export class RepositoryController {
  @Get('')
  get(@Request() request) {
    console.log(`GET repository, ${request.path}`);
    const directory = join(__dirname, '../../../../static/repository');
    const files = readdirSync(directory)
      .filter(f => statSync(join(directory, f)).isFile())
      .sort(
        (f1, f2) =>
          statSync(join(directory, f1)).mtimeMs -
          statSync(join(directory, f2)).mtimeMs,
      );
    return `<html>
    <body><ol>
    ${files.map(file => `<li><a href="${file}">${file}</a></li>`).join('')}
    <ol>
    </body>
    </html>
    `;
    // throw new NotFoundException();
  }

  @Get('*')
  children(@Request() request) {
    throw new NotFoundException();
  }
}

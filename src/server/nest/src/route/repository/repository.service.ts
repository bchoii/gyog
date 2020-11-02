import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { readdirSync, removeSync, statSync, writeFileSync } from 'fs-extra';
import { join } from 'path';
import {
  renderDate,
  renderDatetime,
  uuid,
} from '../../../../../../../main/src/utils';

@Injectable()
export class RepositoryService {
  @Cron(CronExpression.EVERY_12_HOURS)
  cron() {
    const directory = join(__dirname, '../../../../static/repository');
    const files = readdirSync(directory)
      .map(f => join(directory, f))
      .filter(f => statSync(f).isFile())
      .sort((f1, f2) => statSync(f1).mtimeMs - statSync(f2).mtimeMs);
    if (files.length > 30) {
      removeSync(files[0]);
    }

    // if (process.env.NODE_ENV === 'production') {
    //   createfile(directory);
    // }
  }
}

function createfile(directory: string) {
  const today = renderDate(new Date()) + '_' + uuid();
  writeFileSync(join(directory, `${today}.txt`), renderDatetime(new Date()));
}

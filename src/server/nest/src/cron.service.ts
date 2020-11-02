import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { execSync } from 'child_process';
import { uuid } from '../../../../../main/src/utils';
import { config } from './config';
import { sendEmail } from './util/email';

@Injectable()
export class CronService {
  @Cron(CronExpression.EVERY_HOUR)
  EVERY_HOUR() {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${used.toFixed(2)} MB`);
  }
  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async EVERY_DAY_AT_9AM() {
    await sendEmail(
      'bernard@kidotech.com',
      `Test Email from ${config.host} - ${uuid()}`,
      uuid(),
    );
    console.log(execSync('df').toString());
  }
}

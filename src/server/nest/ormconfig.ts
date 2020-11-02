import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { readFileSync } from 'fs-extra';
import { join } from 'path';

export = {
  type: 'postgres',
  url: ``,

  synchronize: false,
  logging: true,
  entities: [__dirname + '/entities/**/*{.ts,.js}'],

  autoLoadEntities: true,
  ssl: {
    rejectUnauthorized: true,
    ca: readFileSync(join(__dirname, './pem/rds-ca-2019-root.pem')).toString(),
  },
} as TypeOrmModuleOptions;

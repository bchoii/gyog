import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { readFileSync } from 'fs-extra';
import { join } from 'path';

const config = {
  // metadataProvider: TsMorphMetadataProvider,
  // tsNode: true,
  // useTsNode: true,
  highlighter: new SqlHighlighter(),
  baseDir: __dirname,
  // entities: [
  //   Appointment,
  //   User,
  //   Parent,
  //   Child,
  //   Csat,
  //   Config,
  //   Counter,
  //   BaseEntity,
  // ],
  entities: ['../entities2/**'],
  type: 'postgresql',
  clientUrl: '',
  debug: true,
  driverOptions: {
    connection: {
      ssl: {
        rejectUnauthorized: true,
        ca: readFileSync(
          join(__dirname, '../pem/rds-ca-2019-root.pem'),
        ).toString(),
      },
    },
  },
} as Options;

export default config;

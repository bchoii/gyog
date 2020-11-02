import { MikroORM } from '@mikro-orm/core';
import { default as config } from '../src/mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(config as any);
  const { em } = orm;

  const results = await em.getConnection().execute(
    // `select generate_series(
    //     date_trunc('hour', now()) - '1 day'::interval, -- start at one day ago, rounded to the hour
    //     date_trunc('hour', now()), -- stop at now, rounded to the hour
    //     '1 hour'::interval -- one hour intervals
    //   ) as hour`,
    `select * from (select right(concat('0', x), 2) as from generate_series(0, 23) as x) as x`,
  );

  orm.close();

  // const result = await em
  //   .getConnection()
  //   .execute(
  //     `select * from "csat" where "csat"."created" between ?::timestamp and ?::timestamp + '1 day'::interval`,
  //     ['2020-07-01', '2020-09-01'],
  //   );
  for (const r of results) {
    console.log(r);
  }

  console.log('Done.');
};

if (require.main === module) {
  main();
}

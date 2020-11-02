import { MikroORM } from '@mikro-orm/core';
import { renderDate } from '../../../../../main/src/utils';
import { default as mikroormconfig } from '../src/mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(mikroormconfig as any);
  const em = orm.em;

  const sql = `select "appointmentdate" as "date", "appointmenttime" as "time", count(*)::integer
  from "appointment"
  where "appointmentdate" >= ?
  group by "appointmentdate", "appointmenttime"
  having count(*) > 1
  order by "appointmentdate", "appointmenttime"`;

  const result = await em
    .getConnection()
    .execute(sql, [renderDate(new Date())]);

  // const result = await em
  //   .getConnection()
  //   .execute(`select count(*)::integer from "counter"`);

  console.log({ result });

  await orm.close(true);
};

if (require.main === module) {
  main();
}

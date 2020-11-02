import { Client } from 'pg';
import { renderDate } from '../../../../../main/src/utils';

const main = async () => {
  const client = new Client({
    connectionString: ``,
  });
  await client.connect();

  const results = (
    await client.query(
      `select "appointmentdate" as "date", "appointmenttime" as "time", count(*)::integer as count
      from "appointment"
      where "appointmentdate" >= ?
      group by "appointmentdate", "appointmenttime"
      having count(*) > 2
      order by "appointmentdate", "appointmenttime"`,
      [renderDate(new Date())],
    )
  ).rows;
  console.log(results);

  client.end();

  console.log('Done.');
};

if (require.main === module) {
  main();
}

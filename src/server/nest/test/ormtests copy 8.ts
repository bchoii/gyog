import { MikroORM } from '@mikro-orm/core';
import config from '../mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(config);
  const { em } = orm;

  {
    const results = await em.getConnection().execute(`select * from "csat2"`);

    for (const result of results) {
      const a = Object.entries(result);
      const sql = `insert into "csat" (${a
        .map(x => `"${x[0]}"`)
        .join(', ')}) values (${a.map(a => '?').join(', ')})`;
      const params = a.map(x => x[1]);
      const insertresults = await em.getConnection().execute(sql, params);
      console.log(insertresults);
    }
  }

  orm.close();

  console.log('Done.');
};

if (require.main === module) {
  main();
}

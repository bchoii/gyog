import { MikroORM } from '@mikro-orm/core';
import { default as mikroormconfig } from '../src/mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(mikroormconfig as any);
  const em = orm.em;

  const results = await em.getConnection().execute(`select * from "user"`);
  console.log(results);

  await orm.close(true);
};

if (require.main === module) {
  main();
}

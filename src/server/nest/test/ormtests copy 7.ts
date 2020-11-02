import { MikroORM } from '@mikro-orm/core';
import config from '../mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(config);
  const { em } = orm;

  {
    console.log(await em.getConnection().execute(`drop table "base_entity2"`));
    console.log(await em.getConnection().execute(`drop table "user2"`));
    console.log(await em.getConnection().execute(`drop table "csat2"`));
  }

  orm.close();

  console.log('Done.');
};

if (require.main === module) {
  main();
}

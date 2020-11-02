import { MikroORM } from '@mikro-orm/core';
import config from '../mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(config);
  const { em } = orm;

  {
    const result = await em.getConnection().execute(`drop table Counter`);
    console.log(result);
  }

  orm.close();

  console.log('Done.');
};

if (require.main === module) {
  main();
}

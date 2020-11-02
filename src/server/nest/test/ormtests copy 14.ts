import { MikroORM } from '@mikro-orm/core';
import { User } from '../entities2/User';
import { default as mikroormconfig } from '../src/mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(mikroormconfig as any);
  const em = orm.em;

  {
    const user = await em.findOne(User, { email: 'bchoii@gmail.com' });
    console.log(JSON.stringify(user, null, 2));
    // wrap(parent).assign({ children: [{ name: 'child-1' }] });
    // await em.persistAndFlush(parent);
    // console.log(JSON.stringify(parent, null, 2));
  }

  await orm.close(true);
};

if (require.main === module) {
  main();
}

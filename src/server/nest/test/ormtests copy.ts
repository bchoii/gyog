import { MikroORM } from '@mikro-orm/core';
import { Parent } from '../entities2/Parent';
import { default as mikroormconfig } from '../src/mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(mikroormconfig as any);
  const em = orm.em;

  // const parent = em.create(Parent, {
  //   name: 'parent1',
  //   roles: ['verified'],
  //   children: [{ name: 'child1' }],
  // });
  // await em.persistAndFlush(parent);

  // {
  //   const parents = await orm.em.find(Parent, {}, ['children']);
  //   console.log(JSON.stringify(parents, null, 2));
  // }

  await orm.close(true);
};

if (require.main === module) {
  main();
}

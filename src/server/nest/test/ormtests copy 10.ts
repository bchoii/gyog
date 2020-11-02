import { MikroORM } from '@mikro-orm/core';
import { Child3 } from '../entity3/Child3';
import { Parent3 } from '../entity3/Parent3';
import config from '../mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(config);
  const { em } = orm;

  const family = JSON.parse(
    `{"name": "Parent A","children": [{ "name": "Child A" }]}`,
  );

  const parent = em.create(Parent3, family) as any;
  console.log(parent);

  // const parent = wrap(parent1).assign(family, {
  //   em,
  //   mergeObjects: true,
  // });

  console.log(parent.__meta);

  const toMany = Object.values(parent.__meta.properties).filter(
    (x: any) => x.reference === '1:m',
  );

  for (const each of toMany) {
    for (const child of (parent as any)[(each as any).name]) {
      child[parent.__meta.properties[(each as any).name].mappedBy] = parent;
    }
  }

  em.persist(parent);

  {
    const all = await em.find(Child3, {});
    for (const one of all) {
      em.removeEntity(one);
    }
  }

  {
    const all = await em.find(Parent3, {});
    for (const one of all) {
      em.removeEntity(one);
    }
  }

  await em.flush();
  await orm.close();
};

if (require.main === module) {
  main();
}

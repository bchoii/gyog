import { MikroORM, wrap } from '@mikro-orm/core';
import { Child } from '../entities/Child';
import { Parent } from '../entities/Parent';
import { default as mikroormconfig } from '../src/mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(mikroormconfig as any);
  const em = orm.em;

  // {
  //   const parent = em.create(Parent, { name: 'parent-2' });
  //   await em.persistAndFlush(parent);
  //   console.log(parent);
  // }

  // {
  //   const parent = await em.findOne(Parent, { name: 'parent-1' }, ['children']);
  //   console.log(JSON.stringify(parent, null, 2));
  //   wrap(parent).assign({ children: [{ name: 'child-1' }] });
  //   await em.persistAndFlush(parent);
  //   console.log(JSON.stringify(parent, null, 2));
  // }

  {
    const parents = await em.find(Parent, {}, ['children']);
    console.log(JSON.stringify(parents, null, 2));
  }

  {
    const children = await em.find(Child, {}, ['parent']);
    console.log(JSON.stringify(children, null, 2));
  }

  {
    const parents = await em.find(Parent, {}, ['children']);
    console.log(JSON.stringify(parents, null, 2));
  }

  {
    const child = await em.findOne(Child, { name: 'child-1' }, ['parent']);
    console.log(JSON.stringify(child, null, 2));
    wrap(child).assign({
      parent: { id: '8a4d54e3-fe22-47d4-851c-40d08a2b0c67', name: 'parent-x' },
    });
    await em.persistAndFlush(child);
    console.log(JSON.stringify(child, null, 2));
  }

  // {
  //   const parent = await em.findOne(Parent, { name: 'parent-1' }, ['children']);
  //   console.log(JSON.stringify(parent, null, 2));
  //   wrap(parent).assign({ children: [{ name: 'child-1' }] });
  //   await em.persistAndFlush(parent);
  //   console.log(JSON.stringify(parent, null, 2));
  // }

  await orm.close(true);
};

if (require.main === module) {
  main();
}

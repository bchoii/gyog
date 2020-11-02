import { MikroORM, wrap } from '@mikro-orm/core';
import { Config } from '../entities2/Config';
import { default as mikroormconfig } from '../src/mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(mikroormconfig as any);
  const em = orm.em;

  // const config = em.create(Config, {
  //   key: 'key',
  //   value: 'value',
  // });
  // console.log(config);
  // await em.persistAndFlush(config);
  // console.log(config);

  {
    const config = await orm.em.findOne(Config, { key: 'key' }, []);
    console.log(JSON.stringify(config, null, 2));
    wrap(config).assign({ value: 'anothernewvalue' });
    await em.persistAndFlush(config);
  }

  {
    const configs = await orm.em.find(Config, { key: 'key' }, []);
    console.log(JSON.stringify(configs, null, 2));
  }

  await orm.close(true);
};

if (require.main === module) {
  main();
}

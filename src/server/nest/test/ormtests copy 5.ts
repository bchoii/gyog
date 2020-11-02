import { MikroORM } from '@mikro-orm/core';
import config from '../mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(config);
  const { em } = orm;

  {
    const result = await em.getConnection().execute(`delete from Counter`);
    console.log(result);
  }

  {
    const result = await em
      .getConnection()
      .execute(`select "value" from Counter where "name" = ?`, ['test1']);
    console.log(result);
  }

  try {
    const result = await em
      .getConnection()
      .execute(
        `update Counter set "updated" = now(), "value" = "value" + 1 where name = ? returning "value"`,
        ['test1'],
      );
    console.log(result[0].value);
  } catch (error) {}

  {
    const result = await em.getConnection().execute(
      `insert into Counter ("id", "created", "updated", "name", "value")
        values (uuid_generate_v4(), now(), now(), ?, ?)`,
      ['test1', 0],
    );
    console.log(result);
  }

  {
    const result = await em
      .getConnection()
      .execute(`select "value" from Counter where "name" = ?`, ['test1']);
    console.log(result);
  }

  {
    const result = await em
      .getConnection()
      .execute(
        `update Counter set "updated" = now(), "value" = "value" + 1 where name = ? returning "value"`,
        ['test1'],
      );
    console.log(result[0].value);
  }

  {
    const result = await em
      .getConnection()
      .execute(
        `update Counter set "updated" = now(), "value" = "value" + 1 where name = ? returning "value"`,
        ['test1'],
      );
    console.log(result[0].value);
  }

  orm.close();

  console.log('Done.');
};

if (require.main === module) {
  main();
}

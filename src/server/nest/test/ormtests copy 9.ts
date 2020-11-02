import { createConnection } from 'typeorm';

const next = async (connection, name) => {
  try {
    const result = await connection.query(
      `update Counter2 set "value" = "value" + 1 where name = ? returning "value"`,
      [name],
    );
    return result[0][0].value;
  } catch (error) {
    console.log(error);
  }
  const result = await connection.query(
    `insert into Counter2 ("name") values (?)`,
    [name],
  );
  return 0;
};

const main = async () => {
  const connection = await createConnection();
  {
    const value = await next(connection, 'countername4');
    console.log({ value });
  }
  {
    const value = await next(connection, 'countername4');
    console.log({ value });
  }
  {
    const value = await next(connection, 'countername4');
    console.log({ value });
  }

  await connection.close();
};

if (require.main === module) {
  main();
}

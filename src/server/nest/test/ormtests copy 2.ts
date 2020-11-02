import { createConnection } from 'typeorm';

const main = async () => {
  const connection = await createConnection();
  const { manager: em } = connection;

  const data = await em.query(`delete from "config"`);

  console.log(data);

  await connection.close();
};

if (require.main === module) {
  main();
}

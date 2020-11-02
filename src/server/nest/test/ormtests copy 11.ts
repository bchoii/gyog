import { createConnection } from 'typeorm';
import { Child } from '../entities/Child';
import { Parent } from '../entities/Parent';

const main = async () => {
  const connection = await createConnection();
  const { manager } = connection;

  const family = JSON.parse(
    `{"name": "Parent A","children": [{ "name": "Child A" }]}`,
  );

  await manager.save(Parent, family);

  {
    const all = await manager.find(Child, {});
    for (const one of all) {
      await manager.remove(one);
    }
  }

  {
    const all = await manager.find(Parent, {});
    for (const one of all) {
      await manager.remove(one);
    }
  }

  await connection.close();
};

if (require.main === module) {
  main();
}

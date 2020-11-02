import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CounterService {
  constructor(private readonly em: EntityManager) {}

  async next(name: string): Promise<number> {
    try {
      console.log('next', name);
      const result = await this.em
        .getConnection()
        .execute(
          `update "counter" set "value" = "value" + 1 where name = ? returning "value"`,
          [name],
        );
      console.log({ result });
      return result[0].value;
    } catch (error) {}
    const result = await this.em
      .getConnection()
      .execute(`insert into "counter" ("name") values (?) returning *`, [name]);
    return 0;
  }
}

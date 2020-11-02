import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Counter {
  @PrimaryKey()
  name: string;

  @Property({ default: 0 })
  value: number;
}

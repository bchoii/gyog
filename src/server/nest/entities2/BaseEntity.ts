import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class BaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id: string;

  @Property()
  created: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updated: Date = new Date();

  @Property({ version: true })
  version!: number;

  @Property({ default: true })
  active: boolean;

  @Property({ default: 0 })
  sort: number;

  @Property({ default: '' })
  code: string;
}

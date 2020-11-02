import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Config extends BaseEntity {
  @Property({ default: '' })
  key: string;

  @Property({ default: '' })
  value: string;
}

import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Csat extends BaseEntity {
  @Property({ default: '' })
  agent: string;

  @Property({ default: '' })
  contact: string;

  @Property({ default: '' })
  rating: string;

  @Property({ default: '' })
  details: string;
}

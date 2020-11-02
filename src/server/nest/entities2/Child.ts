import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Parent } from './Parent';

@Entity()
export class Child extends BaseEntity {
  @Property({ default: '' })
  name: string;

  @ManyToOne(() => Parent, { nullable: true })
  parent: Parent;
}

import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Child } from './Child';

@Entity()
export class Parent extends BaseEntity {
  @Property({ default: '' })
  name: string;

  @OneToMany(
    () => Child,
    child => child.parent,
  )
  children = new Collection<Child>(this);
}

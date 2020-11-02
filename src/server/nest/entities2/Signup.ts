import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Signup extends BaseEntity {
  @Property({ default: '' })
  name: string;

  @Property({ default: '' })
  contact: string;

  @Property({ default: '' })
  email: string;

  @Property({ default: '' })
  roles: string;
}

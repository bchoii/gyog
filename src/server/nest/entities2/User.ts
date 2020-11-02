import { Entity, Enum, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

export enum Role {
  Verified = 'Verified',
  Administrator = 'Administrator',
  Manager = 'Manager',
  Queue = 'Queue',
  Gyog = 'Gyog',
  Csat = 'Csat',
  Appointment = 'Appointment',
  Bethesda = 'Bethesda',
}

@Entity()
export class User extends BaseEntity {
  @Property({ default: '' })
  email: string;

  @Property({ default: '' })
  mobile: string;

  @Property({ default: '' })
  name: string;

  @Property({ default: '' })
  contact: string;

  @Property({ default: '' })
  session: string;

  @Enum({ items: () => Role, array: true, default: [] })
  roles: Role[];

  @Property({ nullable: true })
  thislogin?: Date;

  @Property({ nullable: true })
  lastlogin?: Date;
}

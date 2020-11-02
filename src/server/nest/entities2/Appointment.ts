import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Appointment extends BaseEntity {
  @Property({ default: '' })
  ref: string;

  @Property({ default: '' })
  contact: string;

  @Property({ default: '' })
  name: string;

  @Property({ default: '' })
  purpose: string;

  @Property({ default: '' })
  appointmentdate: string;

  @Property({ default: '' })
  appointmenttime: string;
}

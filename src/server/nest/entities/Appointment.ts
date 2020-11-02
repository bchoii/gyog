import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Appointment extends BaseEntity {
  @Column({ default: '' })
  ref: string;

  @Column({ default: '' })
  contact: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  appointmentdate: string;

  @Column({ default: '' })
  appointmenttime: string;
}

import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';


@Entity()
export class Reminder extends BaseEntity {
  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  contact: string;

  @Column({ default: '' })
  reminderdate: string;

  @Column({ default: '' })
  message: string;
}

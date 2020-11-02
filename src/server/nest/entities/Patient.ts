import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Treatment } from './Treatment';

@Entity()
export class Patient extends BaseEntity {
  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  contact: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  lastvisit: string;

  @Column({ default: '' })
  address: string;

  @ManyToOne(type => Treatment)
  treatment: Treatment;

  @Column({ default: '' })
  ref: string;
}

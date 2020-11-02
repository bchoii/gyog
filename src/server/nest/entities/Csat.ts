import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Csat extends BaseEntity {
  @Column({ default: '' })
  agent: string;

  @Column({ default: '' })
  contact: string;

  @Column({ default: '' })
  rating: string;

  @Column({ default: '' })
  details: string;
}

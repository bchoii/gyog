import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Medication extends BaseEntity {
  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  frequency: string; // Monthly, Bimestrially, Quarterly, Yearly
}

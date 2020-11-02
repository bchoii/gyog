import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Treatment extends BaseEntity {
  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  name2: string;

  @Column({ default: '' })
  frequency: string; // Monthly, Bimestrially, Quarterly, Yearly
}

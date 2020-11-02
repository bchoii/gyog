import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Patient } from './Patient';

@Entity()
export class Prescription extends BaseEntity {
  @ManyToOne(type => Patient)
  patient: Patient;

  @Column({ default: '' })
  details: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: false })
  paid: boolean;
}

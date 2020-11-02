import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Child } from './Child';

@Entity()
export class Parent extends BaseEntity {
  @Column({ default: '' })
  name: string;

  @OneToMany(
    type => Child,
    child => child.parent,
    { cascade: true },
  )
  children: Child[];
}

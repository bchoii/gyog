import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Parent } from './Parent';

@Entity()
export class Child extends BaseEntity {
  @Column({ default: '' })
  name: string;

  @ManyToOne(
    type => Parent,
    order => order.children,
    { onDelete: 'CASCADE' },
  )
  parent: Parent;
}

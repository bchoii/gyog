import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Config extends BaseEntity {
  @Column({ default: '' })
  key: string;

  @Column({ default: '' })
  value: string;
}

import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, default: '' })
  email: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  contact: string;

  @Column({ default: '' })
  session: string;

  @Column('simple-array', { default: '' })
  roles: string[];

  @Column({ nullable: true })
  thislogin: Date;

  @Column({ nullable: true })
  lastlogin: Date;
}

import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @VersionColumn()
  version: number;

  @Column({ default: true })
  active: boolean;

  @Column({ default: 0 })
  sort: number;

  @Column({ default: '' })
  code: string;
}

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Counter {
  @PrimaryColumn()
  name: string;

  @Column({ default: 0 })
  value: number;
}

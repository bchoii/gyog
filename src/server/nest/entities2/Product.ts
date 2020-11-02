import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Category } from './Category';

@Entity()
export class Product extends BaseEntity {
  @Property({ default: '' })
  name: string;

  @Property({ default: '' })
  description: string;

  @ManyToOne(() => Category, { nullable: true })
  category: Category;

  @Property({ default: '' })
  imageurl: string;
}

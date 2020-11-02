import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity()
export class Category extends BaseEntity {
  @Property({ default: '' })
  name: string;

  @OneToMany(
    () => Product,
    product => product.category,
  )
  products = new Collection<Product>(this);
}

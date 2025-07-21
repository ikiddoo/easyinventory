import { Entity, PrimaryKey, Property, OneToMany, Collection, Unique } from '@mikro-orm/core';
import { Product } from '../../product/entities/product.entity';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ length: 255 })
  fullname!: string;

  @Property({ type: 'date', nullable: true })
  dob?: Date;

  @Property({ length: 255 })
  @Unique()
  email!: string;

  @Property({ length: 20, nullable: true })
  mobile?: string;

  @Property({ length: 100 })
  @Unique()
  username!: string;

  @Property({ length: 255 })
  password!: string;

  @Property({ onCreate: () => new Date() })
  created_at!: Date;

  @Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
  updated_at!: Date;

  @OneToMany(() => Product, product => product.user)
  products = new Collection<Product>(this);
}
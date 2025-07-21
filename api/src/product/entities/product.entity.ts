import { Entity, PrimaryKey, Property, ManyToOne, Ref } from '@mikro-orm/core';
import { User } from '../../user/entities/user.entity';

@Entity({ tableName: 'products' })
export class Product {
  @PrimaryKey()
  id!: number;

  @Property({ length: 255 })
  name!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Property({ type: 'float', nullable: true })
  rating?: number;

  @Property({ type: 'text', nullable: true })
  image?: string;

  @Property({ persist: false })
  user_id!: number;

  @Property({ onCreate: () => new Date() })
  created_at!: Date;

  @Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
  updated_at!: Date;

  @ManyToOne(() => User, { deleteRule: 'cascade' })
  user!: Ref<User>;

  constructor() {
    Object.defineProperty(this, 'user_id', {
      get: () => this.user?.id,
      set: (value: number) => {
        if (value) {
          this.user = value as any;
        }
      },
      enumerable: true,
      configurable: true
    });
  }
}
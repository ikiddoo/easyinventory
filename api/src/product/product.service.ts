import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { Product } from './entities/product.entity';
import { User } from '../user/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: EntityRepository<Product>,
    private readonly em: EntityManager,
  ) {}

  async create(createProductDto: CreateProductDto, userId: number): Promise<Product> {
    const user = await this.em.findOneOrFail(User, { id: userId });
    
    const product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.price = createProductDto.price;
    product.rating = createProductDto.rating;
    product.image = createProductDto.image;
    product.user = user as any;

    await this.em.persistAndFlush(product);
    console.log('Product saved with ID:', product.id);
    
    return product;
  }

  async findAll(): Promise<Product[]> {
    return await this.em.find(Product, {}, {
      populate: ['user'],
      fields: ['*', 'user.id', 'user.fullname', 'user.username'] as any
    });
  }

  async findAllByUser(userId: number): Promise<Product[]> {
    return await this.productRepository.find(
      { user: userId },
      { populate: ['user'] }
    );
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.em.findOne(Product, { id }, {
      populate: ['user'],
      fields: ['*', 'user.id', 'user.fullname', 'user.username'] as any
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto, userId: number): Promise<Product> {
    const product = await this.findOne(id);
    
    if (product.user.id !== userId) {
      throw new NotFoundException('Product not found or you do not have permission to update it');
    }

    Object.assign(product, updateProductDto);
    await this.em.persistAndFlush(product);
    
    return product;
  }

  async remove(id: number, userId: number): Promise<{ message: string }> {
    const product = await this.findOne(id);
    
    if (product.user.id !== userId) {
      throw new NotFoundException('Product not found or you do not have permission to delete it');
    }

    await this.em.removeAndFlush(product);
    
    return { message: `Product with ID ${id} has been deleted successfully` };
  }
}
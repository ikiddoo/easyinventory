import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, userId: number): Promise<Product> {
    // Create product entity with user ID
    const product = this.productRepository.create({
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      rating: createProductDto.rating,
      image: createProductDto.image,
      user_id: userId,
    });

    const savedProduct = await this.productRepository.save(product);
    console.log('Product saved with ID:', savedProduct.id);
    
    return savedProduct;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['user'],
      select: {
        user: {
          id: true,
          fullname: true,
          username: true,
        }
      }
    });
  }

  async findAllByUser(userId: number): Promise<Product[]> {
    return await this.productRepository.find({
      where: { user_id: userId },
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        user: {
          id: true,
          fullname: true,
          username: true,
        }
      }
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto, userId: number): Promise<Product> {
    // First, find the product and verify ownership
    const product = await this.findOne(id);
    
    if (product.user_id !== userId) {
      throw new NotFoundException('Product not found or you do not have permission to update it');
    }

    await this.productRepository.update(id, updateProductDto);
    
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<{ message: string }> {
    const product = await this.findOne(id);
    
    if (product.user_id !== userId) {
      throw new NotFoundException('Product not found or you do not have permission to delete it');
    }

    await this.productRepository.delete(id);
    
    return { message: `Product with ID ${id} has been deleted successfully` };
  }
}
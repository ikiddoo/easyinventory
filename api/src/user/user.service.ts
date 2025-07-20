// src/user/user.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: {
    fullname: string;
    dob?: string;
    email: string;
    mobile?: string;
    username: string;
    password: string;
  }): Promise<User> {
    // Check if email or username already exists
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: userData.email },
        { username: userData.username }
      ]
    });

    if (existingUser) {
      throw new ConflictException('Email or username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user entity
    const user = this.userRepository.create({
      fullname: userData.fullname,
      dob: userData.dob ? new Date(userData.dob) : undefined,
      email: userData.email,
      mobile: userData.mobile,
      username: userData.username,
      password: hashedPassword,
    });

    // Save to database
    const savedUser = await this.userRepository.save(user);
    console.log('User saved to database with ID:', savedUser.id);
    
    return savedUser;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { username }
    });
    return user || undefined;
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { id }
    });
    return user || undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email }
    });
    return user || undefined;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'fullname', 'email', 'username', 'mobile', 'dob', 'created_at', 'updated_at']
    });
  }
}
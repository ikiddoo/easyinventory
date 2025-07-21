import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async create(userData: {
    fullname: string;
    dob?: string;
    email: string;
    mobile?: string;
    username: string;
    password: string;
  }): Promise<User> {
    // check if email or username already exists
    const existingUser = await this.userRepository.findOne({
      $or: [
        { email: userData.email },
        { username: userData.username }
      ]
    });

    if (existingUser) {
      throw new ConflictException('Email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = new User();
    user.fullname = userData.fullname;
    user.dob = userData.dob ? new Date(userData.dob) : undefined;
    user.email = userData.email;
    user.mobile = userData.mobile;
    user.username = userData.username;
    user.password = hashedPassword;
    await this.em.persistAndFlush(user);
    console.log('User saved to database with ID:', user.id);
    
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ username });
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ email });
  }

  async findAll(): Promise<User[]> {
    return await this.em.find(User, {}, {
      fields: ['id', 'fullname', 'email', 'username', 'mobile', 'dob', 'created_at', 'updated_at'] as any
    });
  }
}
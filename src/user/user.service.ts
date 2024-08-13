import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserEntity> {
    return await this.userRepository.save(data);
  }

  async findOne(condition): Promise<UserEntity> {
    return await this.userRepository.findOne(condition);
  }

  async find(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      select: ['id', 'name', 'email'],
    });
  }
}

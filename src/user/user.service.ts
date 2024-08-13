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

  async login(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findOneById(id: any): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: id });
  }
}

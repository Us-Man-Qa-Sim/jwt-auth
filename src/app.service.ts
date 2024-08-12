import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
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
}

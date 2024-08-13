import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataOptions } from './data-source';
import { UserEntity } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataOptions,
      entities: [UserEntity],
      synchronize: false,
    }),
    UserModule,
  ],
})
export class AppModule {}

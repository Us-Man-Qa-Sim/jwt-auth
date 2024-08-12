import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';
import { dataOptions } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataOptions,
      entities: [UserEntity],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

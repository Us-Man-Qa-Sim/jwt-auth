import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  async registerUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.appService.create({
      name,
      email,
      password: hashedPassword,
    });

    delete user.password;
    return user;
  }
}

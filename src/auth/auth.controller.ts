import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LocalGuard } from './auth-guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async registerUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.userService.create({
      name,
      email,
      password: hashedPassword,
    });

    delete user.password;
    return user;
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { id } = req?.user as UserEntity;
    const jwt = await this.jwtService.signAsync({ id });
    response.cookie('jwt', jwt, { httpOnly: true });

    return req.user;
  }
}

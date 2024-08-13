import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { JwtGuard } from 'src/auth/auth-guards/jwt.guard';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  @UseGuards(JwtGuard)
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) throw new UnauthorizedException();
      const condition = {
        where: { id: data['id'] },
      };
      const user = await this.userService.findOne(condition);
      delete user.password;
      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Get('users')
  @UseGuards(JwtGuard)
  async users(): Promise<UserEntity[]> {
    const users = await this.userService.find();
    return users;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'Success',
    };
  }
}

import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import { UserDto } from 'src/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: AuthDto) {
    return this.service.login(user);
  }
  @Post('register')
  register(@Body() user: UserDto) {
    return this.service.register(user);
  }
}

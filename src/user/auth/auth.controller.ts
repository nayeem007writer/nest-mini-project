import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sinup(@Body() body: SignupDto) {
    this.authService.signup(body);
  }
}

import { Body, Controller, Post, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDtoRequest,
  LoginResponseDto,
  RefreshTokenDtoRequest,
} from '@/auth/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Version('1')
  async login(@Body() data: LoginDtoRequest): Promise<LoginResponseDto> {
    return this.authService.login(data);
  }

  @Post('refresh-token')
  @Version('1')
  async refreshToken(
    @Body() data: RefreshTokenDtoRequest,
  ): Promise<LoginResponseDto> {
    return this.authService.refreshToken(data.refreshToken);
  }
}

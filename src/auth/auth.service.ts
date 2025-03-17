import { LoginDtoRequest, LoginResponseDto } from '@/auth/dto';
import { HashingService } from '@/libs/hashing';
import { AccessTokenPayload } from '@/shared/dto';
import { User } from '@/users/entity/user.entity';
import { UserInformationNotMatch, UserIsNotActive } from '@/users/exceptions';
import { UsersRepository } from '@/users/users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDtoRequest): Promise<LoginResponseDto> {
    const user = await this.usersRepository.findOneByEmail(data.email);

    if (!user) throw new UserInformationNotMatch();

    if (!user.is_active) throw new UserIsNotActive();

    const isPasswordMatch = await this.hashingService.compare(
      data.password,
      user.password,
    );

    if (!isPasswordMatch) throw new UserInformationNotMatch();

    const tokens = await this.generateTokens(user);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<LoginResponseDto> {
    const payload: AccessTokenPayload =
      await this.jwtService.decode(refreshToken);

    if (!payload) throw new UnauthorizedException();

    const user = await this.usersRepository.findOneByEmail(payload.email);

    if (!user) throw new UserInformationNotMatch();

    if (!user.is_active) throw new UserIsNotActive();

    const tokens = await this.generateTokens(user);

    return {
      accessToken: tokens.accessToken,
      refreshToken,
    };
  }

  private async generateTokens(user: User): Promise<LoginResponseDto> {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: process.env.JWT_SECRET_REFRESH,
        expiresIn: process.env.JWT_EXPIRES_IN_REFRESH,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}

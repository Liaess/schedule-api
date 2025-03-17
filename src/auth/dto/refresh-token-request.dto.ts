import { IsString } from 'class-validator';

export class RefreshTokenDtoRequest {
  @IsString()
  refreshToken: string;
}

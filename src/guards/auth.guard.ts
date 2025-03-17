import { REQUEST_TOKEN_PAYLOAD_KEY } from '@/auth/constants';
import { AccessTokenPayload } from '@/shared/dto';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = this.extractToken(request);

    if (!token) throw new UnauthorizedException();

    return this.jwtService
      .verifyAsync(token, { secret: process.env.JWT_SECRET })
      .then((payload: AccessTokenPayload) => {
        request[REQUEST_TOKEN_PAYLOAD_KEY] = payload;
        return true;
      })
      .catch(() => {
        throw new UnauthorizedException();
      });
  }

  private extractToken(request: Request): string | undefined {
    const authorization = request.headers['authorization'];

    if (!authorization) return undefined;

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') return undefined;

    return token;
  }
}

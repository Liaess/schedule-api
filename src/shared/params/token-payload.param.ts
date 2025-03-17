import { REQUEST_TOKEN_PAYLOAD_KEY } from '@/auth/constants';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TokenPayloadParam = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request[REQUEST_TOKEN_PAYLOAD_KEY];
  },
);

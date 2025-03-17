import { getConstant } from '@/constants/get-constant';
import { HttpException, HttpStatus } from '@nestjs/common';

export class EventNotAuthorizedException extends HttpException {
  constructor(message?: string, status: HttpStatus = HttpStatus.UNAUTHORIZED) {
    super(message || getConstant().EVENT.NOT_AUTHORIZED, status);
  }
}

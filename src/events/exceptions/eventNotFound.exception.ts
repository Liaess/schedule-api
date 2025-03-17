import { getConstant } from '@/constants/get-constant';
import { HttpException, HttpStatus } from '@nestjs/common';

export class EventNotFoundException extends HttpException {
  constructor(message?: string, status: HttpStatus = HttpStatus.NOT_FOUND) {
    super(message || getConstant().EVENT.NOT_FOUND, status);
  }
}

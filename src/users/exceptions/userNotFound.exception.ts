import { getConstant } from '@/constants/get-constant';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(message?: string, status: HttpStatus = HttpStatus.NOT_FOUND) {
    super(message || getConstant().USER.NOT_FOUND, status);
  }
}

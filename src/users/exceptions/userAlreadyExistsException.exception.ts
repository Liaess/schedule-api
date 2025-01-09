import { getConstant } from '@/constants/get-constant';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor(message?: string, status: HttpStatus = HttpStatus.CONFLICT) {
    super(message || getConstant().USER.USER_ALREADY_EXISTS, status);
  }
}

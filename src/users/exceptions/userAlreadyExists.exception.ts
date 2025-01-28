import { getConstant } from '@/constants/get-constant';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor(message?: string, status: HttpStatus = HttpStatus.CONFLICT) {
    super(message || getConstant().USER.ALREADY_EXISTS, status);
  }
}

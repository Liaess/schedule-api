import { getConstant } from '@/constants/get-constant';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserIsNotActive extends HttpException {
  constructor(message?: string, status: HttpStatus = HttpStatus.NOT_FOUND) {
    super(message || getConstant().USER.USER_IS_NOT_ACTIVE, status);
  }
}

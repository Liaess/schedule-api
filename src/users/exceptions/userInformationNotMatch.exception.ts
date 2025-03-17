import { getConstant } from '@/constants/get-constant';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserInformationNotMatch extends HttpException {
  constructor(message?: string, status: HttpStatus = HttpStatus.NOT_FOUND) {
    super(message || getConstant().USER.USER_INFORMATION_NOT_MATCH, status);
  }
}

import { getConstant } from '@/constants/get-constant';
import { HttpException, HttpStatus } from '@nestjs/common';

export class EventConflictDateException extends HttpException {
  constructor(message?: string, status: HttpStatus = HttpStatus.CONFLICT) {
    super(message || getConstant().EVENT.CONFLICT_DATE_END_DATE_HIGHER, status);
  }
}

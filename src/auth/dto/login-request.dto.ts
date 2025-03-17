import { getConstant } from '@/constants/get-constant';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDtoRequest {
  @IsEmail(
    {},
    {
      message: getConstant().USER.EMAIL_MUST_BE_VALID,
    },
  )
  email: string;

  @IsString({
    message: getConstant().USER.PASSWORD_MUST_BE_STRING,
  })
  @MinLength(6, {
    message: getConstant().USER.PASSWORD_MIN_LENGTH,
  })
  password: string;
}

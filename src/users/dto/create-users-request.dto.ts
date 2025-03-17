import { getConstant } from '@/constants/get-constant';
import { Match } from '@/libs/match-class-validator';
import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserRequestDTO {
  @IsString({
    message: getConstant().USER.NAME_MUST_BE_STRING,
  })
  @IsNotEmpty({
    message: getConstant().USER.NAME_MUST_BE_PROVIDED,
  })
  name: string;

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

  @Match(CreateUserRequestDTO, (o) => o.password, {
    message: getConstant().USER.CONFIRM_PASSWORD_MUST_MATCH,
  })
  confirmPassword: string;
}

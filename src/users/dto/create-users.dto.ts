import { IsString, IsEmail, Equals, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters',
  })
  password: string;

  @Equals('password', {
    message: 'Password and Confirm Password must match',
  })
  confirmPassword: string;
}

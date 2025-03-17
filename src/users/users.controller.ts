import { Body, Controller, Post, Version } from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfirmEmailRequestDto, CreateUserRequestDTO } from '@/users/dto';
import { getConstant } from '@/constants/get-constant';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Version('1')
  async create(@Body() data: CreateUserRequestDTO) {
    await this.usersService.create(data);

    return { message: getConstant().USER.USER_CREATED_SUCCESSFULLY };
  }

  @Post('confirm-email')
  @Version('1')
  async confirmEmail(@Body() data: ConfirmEmailRequestDto) {
    await this.usersService.confirmEmail(data.confirmCode);

    return { message: getConstant().USER.EMAIL_CONFIRMED_SUCCESSFULLY };
  }
}

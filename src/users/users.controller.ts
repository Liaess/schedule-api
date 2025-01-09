import { Body, Controller, Post, Version } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from '@users/dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Version('1')
  async create(@Body() data: CreateUserDTO) {
    await this.usersService.create(data);
  }
}

import { Body, Controller, Post, Version } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from '@/src/users/dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Version('1')
  async create(@Body() data: CreateUserDTO) {
    return this.usersService.create(data);
  }
}

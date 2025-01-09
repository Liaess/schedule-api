import { CreateUserDTO } from '@/src/users/dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async create(data: CreateUserDTO) {
    return data;
  }
}

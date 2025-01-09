import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '@users/dto';
import { UserAlreadyExistsException } from './exceptions';
import { UsersRepository } from '@users/users.repository';

@Injectable()
export class UsersService {
  constructor(protected usersRepository: UsersRepository) {}

  async create(data: CreateUserDTO) {
    const isUserExists = await this.usersRepository.findOneByEmail(data.email);

    if (isUserExists) throw new UserAlreadyExistsException();

    await this.usersRepository.create(data);
  }
}

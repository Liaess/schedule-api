import { Injectable } from '@nestjs/common';
import {
  UserAlreadyExistsException,
  UserNotFoundException,
} from './exceptions';
import { HashingService } from '@/libs/hashing';
import { UsersRepository } from '@/users/users.repository';
import { CreateUserRequestDTO } from '@/users/dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashingService: HashingService,
  ) {}

  async create(data: CreateUserRequestDTO) {
    const isUserExists = await this.usersRepository.findOneByEmail(data.email);

    if (isUserExists) throw new UserAlreadyExistsException();

    data.password = await this.hashingService.hash(data.password);

    await this.usersRepository.create(data);
  }

  async confirmEmail(confirmCode: string) {
    const user =
      await this.usersRepository.findOneByActivationCode(confirmCode);

    if (!user) throw new UserNotFoundException();

    await this.usersRepository.activateUser(user.id);
  }
}

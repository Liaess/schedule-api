import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '@users/dto';
import {
  UserAlreadyExistsException,
  UserNotFoundException,
} from './exceptions';
import { UsersRepository } from '@users/users.repository';
import { MailService } from '@mail/mail.service';
import {
  generateSignupContent,
  generateSignupSubject,
  signUpRedirectUrl,
} from '@users/constants';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private mailService: MailService,
  ) {}

  async create(data: CreateUserDTO) {
    const isUserExists = await this.usersRepository.findOneByEmail(data.email);

    if (isUserExists) throw new UserAlreadyExistsException();

    const user = await this.usersRepository.create(data);

    await this.mailService.send({
      to: data.email,
      html: generateSignupContent(
        data.email,
        signUpRedirectUrl(user.activation_code),
      ),
      subject: generateSignupSubject(),
    });
  }

  async confirmEmail(confirmCode: string) {
    const user =
      await this.usersRepository.findOneByActivationCode(confirmCode);

    if (!user) throw new UserNotFoundException();

    await this.usersRepository.activateUser(user.id);
  }
}

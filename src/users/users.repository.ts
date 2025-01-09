import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from '@users/dto';
import { User } from '@users/entity/user.entity';
import { Repository } from 'typeorm';

export class UsersRepository {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async findOneByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }

  async create(data: CreateUserDTO): Promise<void> {
    await this.repository.insert(data);
  }
}

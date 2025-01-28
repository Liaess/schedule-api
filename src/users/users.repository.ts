import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from '@users/dto';
import { User } from '@users/entity/user.entity';
import { Repository } from 'typeorm';

export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }

  async create(data: CreateUserDTO): Promise<User> {
    return this.repository.save(data);
  }

  async findOneByActivationCode(activationCode: string): Promise<User> {
    return this.repository.findOne({
      where: { activation_code: activationCode },
    });
  }

  async activateUser(id: string): Promise<void> {
    await this.repository.update(id, { isActive: true });
  }
}

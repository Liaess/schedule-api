import { CreateUserRequestDTO } from '@/users/dto';
import { User } from '@/users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    return await this.repository.findOne({
      where: { email },
    });
  }

  async create(data: CreateUserRequestDTO): Promise<User> {
    return await this.repository.save({
      ...data,
      is_active: true,
    });
  }

  async findOneByActivationCode(activationCode: string): Promise<User> {
    return await this.repository.findOne({
      where: { activation_code: activationCode },
    });
  }

  async activateUser(id: string): Promise<void> {
    await this.repository.update(id, { is_active: true });
  }
}

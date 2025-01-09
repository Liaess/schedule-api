import { CreateUserDTO } from '@/src/users/dto';
import { User } from '@/src/users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UsersRepository {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}
  async create(data: CreateUserDTO): Promise<User> {
    return this.repository.save(data);
  }
}

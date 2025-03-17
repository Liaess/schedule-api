import { CreateUserRequestDTO } from '@/users/dto';
import { User } from '@/users/entity/user.entity';
import { faker } from '@faker-js/faker';

export const PASSWORD_MOCK = faker.internet.password();

export const CREATE_USER_MOCK: CreateUserRequestDTO = {
  email: faker.internet.email(),
  password: PASSWORD_MOCK,
  name: faker.person.firstName(),
  confirmPassword: PASSWORD_MOCK,
};

export const USER_MOCK: Partial<User> = {
  id: faker.string.uuid(),
  email: faker.internet.email(),
  password: PASSWORD_MOCK,
  name: faker.person.firstName(),
  is_active: true,
  activation_code: faker.string.uuid(),
  created_at: new Date(),
  updated_at: new Date(),
};

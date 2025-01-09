import { faker } from '@faker-js/faker/.';
import { CreateUserDTO } from '@users/dto';
import { User } from '@users/entity/user.entity';

const PASSWORD_MOCK = faker.internet.password();

export const CREATE_USER_MOCK: CreateUserDTO = {
  email: faker.internet.email(),
  password: PASSWORD_MOCK,
  name: faker.person.firstName(),
  confirmPassword: PASSWORD_MOCK,
};

export const USER_MOCK: User = {
  id: faker.number.int(),
  email: faker.internet.email(),
  password: PASSWORD_MOCK,
  name: faker.person.firstName(),
  isActive: true,
  created_at: new Date(),
};

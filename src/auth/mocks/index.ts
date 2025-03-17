import { LoginDtoRequest } from '@/auth/dto';
import { faker } from '@faker-js/faker';

export const RANDOM_REFRESH_TOKEN_MOCK = faker.string.uuid();

export const RANDOM_TOKEN_MOCK = faker.string.uuid();

export const LOGIN_REQUEST_MOCK: LoginDtoRequest = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

export const JWT_PAYLOAD_MOCK = {
  email: faker.internet.email(),
  sub: faker.string.uuid(),
  iat: faker.date.recent().getTime(),
  exp: faker.date.recent().getTime(),
};

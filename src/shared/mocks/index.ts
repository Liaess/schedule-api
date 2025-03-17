import { AccessTokenPayload } from '@/shared/dto';
import { faker } from '@faker-js/faker';

export const ACCESS_TOKEN_PAYLOAD_MOCK: AccessTokenPayload = {
  sub: faker.string.uuid(),
  email: faker.internet.email(),
  exp: faker.date.future().getTime(),
  iat: faker.date.recent().getTime(),
};

import { faker } from '@faker-js/faker/.';
import { SendMailDto } from '@mail/dto';

export const SEND_MAIL_MOCK: SendMailDto = {
  to: faker.internet.email(),
  subject: faker.lorem.sentence(),
  html: faker.lorem.paragraph(),
};

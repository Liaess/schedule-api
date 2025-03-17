import { CreateEventRequestDto, UpdateEventRequestDto } from '@/events/dto';
import { Event } from '@/events/entities/event.entity';
import { faker } from '@faker-js/faker';

export const CREATE_EVENT_MOCK: CreateEventRequestDto = {
  title: faker.lorem.word(),
  description: faker.lorem.sentence(),
  start_date: faker.date.recent(),
  end_date: faker.date.future(),
  url: faker.internet.url(),
};

export const USER_ID_MOCK = faker.string.uuid();

export const UPDATE_EVENT_MOCK: UpdateEventRequestDto = {
  title: faker.lorem.word(),
};

export const EVENT_MOCK: Event = {
  id: faker.string.uuid(),
  title: faker.lorem.word(),
  description: faker.lorem.sentence(),
  start_date: faker.date.recent(),
  end_date: faker.date.future(),
  url: faker.internet.url(),
  user_id: faker.string.uuid(),
};

export const OLD_DATE_MOCK = faker.date.past({
  years: 2,
});

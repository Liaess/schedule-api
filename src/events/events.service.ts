import { CreateEventRequestDto, UpdateEventRequestDto } from '@/events/dto';
import { Event } from '@/events/entities/event.entity';
import { EventsRepository } from '@/events/events.repository';
import {
  EventConflictDateException,
  EventNotAuthorizedException,
  EventNotFoundException,
} from '@/events/exceptions';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async create(data: CreateEventRequestDto, userId: string): Promise<Event> {
    const endDate = new Date(data.end_date);
    const startDate = new Date(data.start_date);

    if (endDate < startDate) throw new EventConflictDateException();

    return await this.eventsRepository.create(data, userId);
  }

  async findAll(userId: string): Promise<Event[]> {
    return await this.eventsRepository.findAll(userId);
  }

  async findOne(id: string, userId: string): Promise<Event> {
    const event = await this.eventsRepository.findOne(id, userId);

    if (!event) throw new EventNotFoundException();

    return event;
  }

  async update(
    id: string,
    data: UpdateEventRequestDto,
    userId: string,
  ): Promise<void> {
    const event = await this.eventsRepository.findOne(id, userId);

    this.validateEvent(event, userId);

    await this.eventsRepository.update(id, data, userId);
  }

  async remove(id: string, userId: string): Promise<void> {
    const event = await this.eventsRepository.findOne(id, userId);

    this.validateEvent(event, userId);

    await this.eventsRepository.remove(id, userId);
  }

  private validateEvent(event: Event, userId: string) {
    if (!event) throw new EventNotFoundException();

    if (event.user_id !== userId) throw new EventNotAuthorizedException();
  }
}

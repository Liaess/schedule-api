import { CreateEventRequestDto, UpdateEventRequestDto } from '@/events/dto';
import { Event } from '@/events/entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class EventsRepository {
  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
  ) {}

  async create(data: CreateEventRequestDto, userId: string): Promise<Event> {
    return await this.repository.save({
      ...data,
      user_id: userId,
    });
  }

  async findAll(userId: string): Promise<Event[]> {
    return await this.repository.find({
      where: {
        user: {
          id: userId,
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        end_date: true,
        start_date: true,
        address: true,
        url: true,
      },
    });
  }

  async findOne(id: string, userId: string): Promise<Event> {
    return await this.repository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });
  }

  async update(
    id: string,
    data: UpdateEventRequestDto,
    userId: string,
  ): Promise<void> {
    await this.repository.update(
      {
        id,
        user: {
          id: userId,
        },
      },
      data,
    );
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.repository.delete({
      id,
      user: {
        id: userId,
      },
    });
  }
}

import { CreateEventRequestDto } from '@/events/dto/create-event-request.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEventRequestDto extends PartialType(CreateEventRequestDto) {}

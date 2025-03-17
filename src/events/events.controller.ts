import {
  Controller,
  Post,
  Body,
  Version,
  UseGuards,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventRequestDto, UpdateEventRequestDto } from '@/events/dto';
import { AuthGuard } from '@/guards/auth.guard';
import { Event } from '@/events/entities/event.entity';
import { AccessTokenPayload } from '@/shared/dto';
import { TokenPayloadParam } from '@/shared/params/token-payload.param';
import { getConstant } from '@/constants/get-constant';

@Controller('events')
@UseGuards(AuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Version('1')
  async create(
    @Body() createEventDto: CreateEventRequestDto,
    @TokenPayloadParam() userTokenData: AccessTokenPayload,
  ) {
    await this.eventsService.create(createEventDto, userTokenData.sub);

    return { message: getConstant().EVENT.EVENT_CREATED_SUCCESSFULLY };
  }

  @Get()
  @Version('1')
  async findAll(
    @TokenPayloadParam() userTokenData: AccessTokenPayload,
  ): Promise<Event[]> {
    return await this.eventsService.findAll(userTokenData.sub);
  }

  @Get(':id')
  @Version('1')
  async findOne(
    @Param('id') id: string,
    @TokenPayloadParam() userTokenData: AccessTokenPayload,
  ) {
    return await this.eventsService.findOne(id, userTokenData.sub);
  }

  @Patch(':id')
  @Version('1')
  async update(
    @Param('id') id: string,
    @Body() updateEventRequestDto: UpdateEventRequestDto,
    @TokenPayloadParam() userTokenData: AccessTokenPayload,
  ) {
    await this.eventsService.update(
      id,
      updateEventRequestDto,
      userTokenData.sub,
    );

    return { message: getConstant().EVENT.EVENT_UPDATED_SUCCESSFULLY };
  }

  @Delete(':id')
  @Version('1')
  async remove(
    @Param('id') id: string,
    @TokenPayloadParam() userTokenData: AccessTokenPayload,
  ) {
    await this.eventsService.remove(id, userTokenData.sub);

    return { message: getConstant().EVENT.EVENT_DELETED_SUCCESSFULLY };
  }
}

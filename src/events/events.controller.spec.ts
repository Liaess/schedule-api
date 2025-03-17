import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { CREATE_EVENT_MOCK, EVENT_MOCK } from '@/events/mocks';
import { AuthGuard } from '@/guards/auth.guard';
import { CanActivate } from '@nestjs/common';
import { ACCESS_TOKEN_PAYLOAD_MOCK } from '@/shared/mocks';
import { getConstant } from '@/constants/get-constant';

const mockEventsServiceCreate = jest.fn();
const mockEventsServiceFindAll = jest.fn();
const mockEventsServiceFindOne = jest.fn();
const mockEventsServiceUpdate = jest.fn();
const mockEventsServiceRemove = jest.fn();

const mockAuthGuard: CanActivate = {
  canActivate: jest.fn(() => true),
};

describe('EventsController', () => {
  let controller: EventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: {
            create: mockEventsServiceCreate,
            findAll: mockEventsServiceFindAll,
            findOne: mockEventsServiceFindOne,
            update: mockEventsServiceUpdate,
            remove: mockEventsServiceRemove,
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an event', async () => {
      const response = await controller.create(
        CREATE_EVENT_MOCK,
        ACCESS_TOKEN_PAYLOAD_MOCK,
      );

      expect(mockEventsServiceCreate).toHaveBeenCalledWith(
        CREATE_EVENT_MOCK,
        ACCESS_TOKEN_PAYLOAD_MOCK.sub,
      );

      expect(response).toEqual({
        message: getConstant().EVENT.EVENT_CREATED_SUCCESSFULLY,
      });
    });
  });

  describe('findAll', () => {
    it('should return all events', async () => {
      mockEventsServiceFindAll.mockReturnValue([EVENT_MOCK]);
      const response = await controller.findAll(ACCESS_TOKEN_PAYLOAD_MOCK);

      expect(mockEventsServiceFindAll).toHaveBeenCalledWith(
        ACCESS_TOKEN_PAYLOAD_MOCK.sub,
      );

      expect(response).toEqual([EVENT_MOCK]);
    });
  });

  describe('findOne', () => {
    it('should return an event', async () => {
      mockEventsServiceFindOne.mockReturnValue(EVENT_MOCK);
      const response = await controller.findOne('1', ACCESS_TOKEN_PAYLOAD_MOCK);

      expect(mockEventsServiceFindOne).toHaveBeenCalledWith(
        '1',
        ACCESS_TOKEN_PAYLOAD_MOCK.sub,
      );

      expect(response).toEqual(EVENT_MOCK);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const response = await controller.update(
        '1',
        CREATE_EVENT_MOCK,
        ACCESS_TOKEN_PAYLOAD_MOCK,
      );

      expect(mockEventsServiceUpdate).toHaveBeenCalledWith(
        '1',
        CREATE_EVENT_MOCK,
        ACCESS_TOKEN_PAYLOAD_MOCK.sub,
      );

      expect(response).toEqual({
        message: getConstant().EVENT.EVENT_UPDATED_SUCCESSFULLY,
      });
    });
  });

  describe('remove', () => {
    it('should remove an event', async () => {
      const response = await controller.remove('1', ACCESS_TOKEN_PAYLOAD_MOCK);

      expect(mockEventsServiceRemove).toHaveBeenCalledWith(
        '1',
        ACCESS_TOKEN_PAYLOAD_MOCK.sub,
      );

      expect(response).toEqual({
        message: getConstant().EVENT.EVENT_DELETED_SUCCESSFULLY,
      });
    });
  });
});

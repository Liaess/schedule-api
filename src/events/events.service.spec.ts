import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { EventsRepository } from '@/events/events.repository';
import {
  CREATE_EVENT_MOCK,
  EVENT_MOCK,
  OLD_DATE_MOCK,
  UPDATE_EVENT_MOCK,
  USER_ID_MOCK,
} from '@/events/mocks';
import {
  EventConflictDateException,
  EventNotAuthorizedException,
  EventNotFoundException,
} from '@/events/exceptions';

const mockEventRepositoryCreate = jest.fn();
const mockEventRepositoryFindAll = jest.fn();
const mockEventRepositoryFindOne = jest.fn();
const mockEventRepositoryUpdate = jest.fn();
const mockEventRepositoryRemove = jest.fn();

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: EventsRepository,
          useValue: {
            create: mockEventRepositoryCreate,
            findAll: mockEventRepositoryFindAll,
            findOne: mockEventRepositoryFindOne,
            update: mockEventRepositoryUpdate,
            remove: mockEventRepositoryRemove,
          },
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an event', async () => {
      await service.create(CREATE_EVENT_MOCK, USER_ID_MOCK);

      expect(mockEventRepositoryCreate).toHaveBeenCalledWith(
        CREATE_EVENT_MOCK,
        USER_ID_MOCK,
      );
      expect(mockEventRepositoryCreate).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if end_date is before start_date', async () => {
      const data = { ...CREATE_EVENT_MOCK, end_date: OLD_DATE_MOCK };

      await expect(service.create(data, USER_ID_MOCK)).rejects.toThrow(
        EventConflictDateException,
      );
      expect(mockEventRepositoryCreate).toHaveBeenCalledTimes(0);
    });
  });

  describe('findAll', () => {
    it('should return all events', async () => {
      mockEventRepositoryFindAll.mockReturnValueOnce(Array(2).fill(EVENT_MOCK));
      const response = await service.findAll(USER_ID_MOCK);

      expect(mockEventRepositoryFindAll).toHaveBeenCalledWith(USER_ID_MOCK);
      expect(mockEventRepositoryFindAll).toHaveBeenCalledTimes(1);
      expect(response).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('should return an event', async () => {
      mockEventRepositoryFindOne.mockReturnValueOnce(EVENT_MOCK);
      const response = await service.findOne('1', USER_ID_MOCK);

      expect(mockEventRepositoryFindOne).toHaveBeenCalledWith(
        '1',
        USER_ID_MOCK,
      );
      expect(mockEventRepositoryFindOne).toHaveBeenCalledTimes(1);
      expect(response).toEqual(EVENT_MOCK);
    });

    it('should throw an error if event is not found', async () => {
      mockEventRepositoryFindOne.mockReturnValueOnce(undefined);

      await expect(service.findOne('1', USER_ID_MOCK)).rejects.toThrow(
        EventNotFoundException,
      );

      expect(mockEventRepositoryFindOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      mockEventRepositoryFindOne.mockReturnValueOnce({
        ...EVENT_MOCK,
        user_id: USER_ID_MOCK,
      });

      await service.update('1', UPDATE_EVENT_MOCK, USER_ID_MOCK);

      expect(mockEventRepositoryFindOne).toHaveBeenCalledWith(
        '1',
        USER_ID_MOCK,
      );
      expect(mockEventRepositoryFindOne).toHaveBeenCalledTimes(1);

      expect(mockEventRepositoryUpdate).toHaveBeenCalledWith(
        '1',
        UPDATE_EVENT_MOCK,
        USER_ID_MOCK,
      );
      expect(mockEventRepositoryUpdate).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if event is not found', async () => {
      mockEventRepositoryFindOne.mockReturnValueOnce(undefined);

      await expect(
        service.update('1', CREATE_EVENT_MOCK, USER_ID_MOCK),
      ).rejects.toThrow(EventNotFoundException);

      expect(mockEventRepositoryFindOne).toHaveBeenCalledTimes(1);
      expect(mockEventRepositoryUpdate).toHaveBeenCalledTimes(0);
    });

    it('should throw an error if user is not authorized', async () => {
      mockEventRepositoryFindOne.mockReturnValueOnce(EVENT_MOCK);

      await expect(
        service.update('1', CREATE_EVENT_MOCK, 'other-user-id'),
      ).rejects.toThrow(EventNotAuthorizedException);

      expect(mockEventRepositoryFindOne).toHaveBeenCalledTimes(1);
      expect(mockEventRepositoryUpdate).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should remove an event', async () => {
      mockEventRepositoryFindOne.mockReturnValueOnce({
        ...EVENT_MOCK,
        user_id: USER_ID_MOCK,
      });

      await service.remove('1', USER_ID_MOCK);

      expect(mockEventRepositoryFindOne).toHaveBeenCalledWith(
        '1',
        USER_ID_MOCK,
      );
      expect(mockEventRepositoryFindOne).toHaveBeenCalledTimes(1);

      expect(mockEventRepositoryRemove).toHaveBeenCalledWith('1', USER_ID_MOCK);
      expect(mockEventRepositoryRemove).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if event is not found', async () => {
      mockEventRepositoryFindOne.mockReturnValueOnce(undefined);

      await expect(service.remove('1', USER_ID_MOCK)).rejects.toThrow(
        EventNotFoundException,
      );

      expect(mockEventRepositoryFindOne).toHaveBeenCalledTimes(1);
      expect(mockEventRepositoryRemove).toHaveBeenCalledTimes(0);
    });

    it('should throw an error if user is not authorized', async () => {
      mockEventRepositoryFindOne.mockReturnValueOnce(EVENT_MOCK);

      await expect(service.remove('1', 'other-user-id')).rejects.toThrow(
        EventNotAuthorizedException,
      );

      expect(mockEventRepositoryFindOne).toHaveBeenCalledTimes(1);
      expect(mockEventRepositoryRemove).toHaveBeenCalledTimes(0);
    });
  });
});

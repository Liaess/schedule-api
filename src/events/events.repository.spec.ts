import { Event } from '@/events/entities/event.entity';
import { EventsRepository } from '@/events/events.repository';
import { CREATE_EVENT_MOCK } from '@/events/mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockRepositorySave = jest.fn();
const mockRepositoryFind = jest.fn();
const mockRepositoryFindOne = jest.fn();
const mockRepositoryUpdate = jest.fn();
const mockRepositoryDelete = jest.fn();

describe('EventsRepository', () => {
  let repository: EventsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsRepository,
        {
          provide: getRepositoryToken(Event),
          useValue: {
            save: mockRepositorySave,
            find: mockRepositoryFind,
            findOne: mockRepositoryFindOne,
            update: mockRepositoryUpdate,
            delete: mockRepositoryDelete,
          },
        },
      ],
    }).compile();

    repository = module.get<EventsRepository>(EventsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create an event', async () => {
      await repository.create(CREATE_EVENT_MOCK, '1');

      expect(mockRepositorySave).toHaveBeenCalledWith({
        ...CREATE_EVENT_MOCK,
        user_id: '1',
      });
    });
  });

  describe('findAll', () => {
    it('should return events', async () => {
      mockRepositoryFind.mockResolvedValue(Array(2).fill(CREATE_EVENT_MOCK));
      const events = await repository.findAll('1');

      expect(events).toEqual(Array(2).fill(CREATE_EVENT_MOCK));
      expect(mockRepositoryFind).toHaveBeenCalledWith({
        where: {
          user: {
            id: '1',
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
    });
  });

  describe('findOne', () => {
    it('should return an event', async () => {
      mockRepositoryFindOne.mockResolvedValue(CREATE_EVENT_MOCK);
      const event = await repository.findOne('1', '1');

      expect(event).toEqual(CREATE_EVENT_MOCK);
      expect(mockRepositoryFindOne).toHaveBeenCalledWith({
        where: {
          id: '1',
          user: {
            id: '1',
          },
        },
      });
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      await repository.update('1', CREATE_EVENT_MOCK, '1');

      expect(mockRepositoryUpdate).toHaveBeenCalledWith(
        {
          id: '1',
          user: {
            id: '1',
          },
        },
        CREATE_EVENT_MOCK,
      );
    });
  });

  describe('remove', () => {
    it('should remove an event', async () => {
      await repository.remove('1', '1');

      expect(mockRepositoryDelete).toHaveBeenCalledWith({
        id: '1',
        user: {
          id: '1',
        },
      });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from '@users/users.repository';
import { CREATE_USER_MOCK, USER_MOCK } from '@users/mocks';

const mockUserRepositoryFindOneByEmail = jest.fn();
const mockUserRepositoryCreate = jest.fn();

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findOneByEmail: mockUserRepositoryFindOneByEmail,
            create: mockUserRepositoryCreate,
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw an error if user already exists', async () => {
      mockUserRepositoryFindOneByEmail.mockResolvedValue(USER_MOCK);

      await expect(service.create(CREATE_USER_MOCK)).rejects.toThrow();
      expect(mockUserRepositoryFindOneByEmail).toHaveBeenCalledTimes(1);
      expect(mockUserRepositoryCreate).toHaveBeenCalledTimes(0);
    });

    it('should create a new user', async () => {
      mockUserRepositoryFindOneByEmail.mockResolvedValue(null);
      mockUserRepositoryCreate.mockResolvedValue(USER_MOCK);

      await service.create(CREATE_USER_MOCK);
      expect(mockUserRepositoryFindOneByEmail).toHaveBeenCalledTimes(1);
      expect(mockUserRepositoryCreate).toHaveBeenCalledTimes(1);
    });
  });
});

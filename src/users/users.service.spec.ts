import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { HashingService } from '@/libs/hashing';
import { UsersRepository } from '@/users/users.repository';
import { CREATE_USER_MOCK, PASSWORD_MOCK, USER_MOCK } from '@/users/mocks';
import {
  UserAlreadyExistsException,
  UserNotFoundException,
} from '@/users/exceptions';

const mockUserRepositoryFindOneByEmail = jest.fn();
const mockUserRepositoryFindOneByActivationCode = jest.fn();
const mockUserRepositoryCreate = jest.fn();
const mockUserRepositoryActivateUser = jest.fn();

const mockHashingServiceHash = jest.fn();

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
            findOneByActivationCode: mockUserRepositoryFindOneByActivationCode,
            activateUser: mockUserRepositoryActivateUser,
          },
        },
        {
          provide: HashingService,
          useValue: {
            hash: mockHashingServiceHash,
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
    it('should create a new user', async () => {
      mockHashingServiceHash.mockResolvedValue(PASSWORD_MOCK);
      mockUserRepositoryFindOneByEmail.mockResolvedValue(null);
      mockUserRepositoryCreate.mockResolvedValue(USER_MOCK);

      await service.create(CREATE_USER_MOCK);
      expect(mockUserRepositoryFindOneByEmail).toHaveBeenCalledTimes(1);
      expect(mockHashingServiceHash).toHaveBeenCalledTimes(1);
      expect(mockHashingServiceHash).toHaveBeenCalledWith(PASSWORD_MOCK);
      expect(mockUserRepositoryCreate).toHaveBeenCalledTimes(1);
      expect(mockUserRepositoryCreate).toHaveBeenCalledWith({
        ...CREATE_USER_MOCK,
        password: PASSWORD_MOCK,
      });
    });

    it('should throw an error if user already exists', async () => {
      mockUserRepositoryFindOneByEmail.mockResolvedValue(USER_MOCK);

      await expect(service.create(CREATE_USER_MOCK)).rejects.toThrow(
        UserAlreadyExistsException,
      );
      expect(mockUserRepositoryFindOneByEmail).toHaveBeenCalledTimes(1);
      expect(mockUserRepositoryCreate).toHaveBeenCalledTimes(0);
    });
  });

  describe('confirmEmail', () => {
    it('should throw an error if user not found', async () => {
      mockUserRepositoryFindOneByActivationCode.mockResolvedValue(null);

      await expect(service.confirmEmail('123')).rejects.toThrow(
        UserNotFoundException,
      );
      expect(mockUserRepositoryFindOneByActivationCode).toHaveBeenCalledTimes(
        1,
      );
      expect(mockUserRepositoryActivateUser).toHaveBeenCalledTimes(0);
    });

    it('should activate user', async () => {
      mockUserRepositoryFindOneByActivationCode.mockResolvedValue(USER_MOCK);

      await service.confirmEmail('123');
      expect(mockUserRepositoryFindOneByActivationCode).toHaveBeenCalledTimes(
        1,
      );
      expect(mockUserRepositoryActivateUser).toHaveBeenCalledTimes(1);
      expect(mockUserRepositoryActivateUser).toHaveBeenCalledWith(USER_MOCK.id);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@users/entity/user.entity';
import { CREATE_USER_MOCK, USER_MOCK } from '@users/mocks';
import { UsersRepository } from '@users/users.repository';

const mockRepositorySave = jest.fn();
const mockRepositoryFindOne = jest.fn();
const mockRepositoryUpdate = jest.fn();

describe('UsersRepository', () => {
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: mockRepositoryFindOne,
            save: mockRepositorySave,
            update: mockRepositoryUpdate,
          },
        },
      ],
    }).compile();

    repository = module.get<UsersRepository>(UsersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findOneByEmail', () => {
    it('should return a user', async () => {
      mockRepositoryFindOne.mockResolvedValue(USER_MOCK);
      const user = await repository.findOneByEmail(USER_MOCK.email);

      expect(user).toEqual(USER_MOCK);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      await repository.create(CREATE_USER_MOCK);

      expect(mockRepositorySave).toHaveBeenCalledWith(CREATE_USER_MOCK);
    });
  });

  describe('findOneByActivationCode', () => {
    it('should return a user', async () => {
      mockRepositoryFindOne.mockResolvedValue(USER_MOCK);
      const user = await repository.findOneByActivationCode(
        USER_MOCK.activation_code,
      );

      expect(user).toEqual(USER_MOCK);
    });
  });

  describe('activateUser', () => {
    it('should activate a user', async () => {
      await repository.activateUser(USER_MOCK.id);

      expect(mockRepositoryUpdate).toHaveBeenCalledWith(USER_MOCK.id, {
        isActive: true,
      });
    });
  });
});

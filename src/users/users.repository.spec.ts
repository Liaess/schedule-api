import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@users/entity/user.entity';
import { CREATE_USER_MOCK, USER_MOCK } from '@users/mocks';
import { UsersRepository } from '@users/users.repository';

const mockRepositoryInsert = jest.fn();
const mockRepositoryFindOne = jest.fn();

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
            insert: mockRepositoryInsert,
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

      expect(mockRepositoryInsert).toHaveBeenCalledWith(CREATE_USER_MOCK);
    });
  });
});

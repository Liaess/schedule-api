import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from '@users/users.repository';
import { CREATE_USER_MOCK, USER_MOCK } from '@users/mocks';
import { MailService } from '@mail/mail.service';

const mockConfigIsProd = jest.fn(() => false);
jest.mock('@config/index', () => ({
  isProd: () => mockConfigIsProd(),
}));

jest.mock('@users/constants', () => ({
  generateSignupContent: jest.fn(),
  generateSignupSubject: jest.fn(),
  signUpRedirectUrl: jest.fn(),
}));

const mockUserRepositoryFindOneByEmail = jest.fn();
const mockUserRepositoryFindOneByActivationCode = jest.fn();
const mockUserRepositoryCreate = jest.fn();
const mockUserRepositoryActivateUser = jest.fn();
const mockSend = jest.fn();

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
          provide: MailService,
          useValue: {
            send: mockSend,
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
      expect(mockSend).toHaveBeenCalledTimes(0);
    });

    it('should create a new user', async () => {
      mockUserRepositoryFindOneByEmail.mockResolvedValue(null);
      mockUserRepositoryCreate.mockResolvedValue(USER_MOCK);

      await service.create(CREATE_USER_MOCK);
      expect(mockUserRepositoryFindOneByEmail).toHaveBeenCalledTimes(1);
      expect(mockUserRepositoryCreate).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledTimes(1);
    });
  });

  describe('confirmEmail', () => {
    it('should throw an error if user not found', async () => {
      mockUserRepositoryFindOneByActivationCode.mockResolvedValue(null);

      await expect(service.confirmEmail('123')).rejects.toThrow();
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

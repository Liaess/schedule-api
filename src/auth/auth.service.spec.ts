import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from '@/libs/hashing';
import { UsersRepository } from '@/users/users.repository';
import { USER_MOCK } from '@/users/mocks';
import { UserInformationNotMatch, UserIsNotActive } from '@/users/exceptions';
import { RANDOM_REFRESH_TOKEN_MOCK, RANDOM_TOKEN_MOCK } from '@/auth/mocks';
import { UnauthorizedException } from '@nestjs/common';

const mockUsersRepositoryFindOneByEmail = jest.fn();
const mockJwtServiceSignAsync = jest.fn();
const mockJwtServiceDecode = jest.fn();
const mockHashingServiceCompare = jest.fn();

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersRepository,
          useValue: {
            findOneByEmail: mockUsersRepositoryFindOneByEmail,
          },
        },
        {
          provide: HashingService,
          useValue: {
            compare: mockHashingServiceCompare,
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: mockJwtServiceSignAsync,
            decode: mockJwtServiceDecode,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return accessToken and refreshToken', async () => {
      mockHashingServiceCompare.mockReturnValue(true);
      mockJwtServiceSignAsync
        .mockResolvedValue(RANDOM_TOKEN_MOCK)
        .mockReturnValue(RANDOM_TOKEN_MOCK);
      mockUsersRepositoryFindOneByEmail.mockResolvedValue(USER_MOCK);

      const result = await service.login({
        email: USER_MOCK.email,
        password: USER_MOCK.password,
      });

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.accessToken).toBe(RANDOM_TOKEN_MOCK);
      expect(result.refreshToken).toBe(RANDOM_TOKEN_MOCK);
    });

    it('should throw UserInformationNotMatch when no user is found', async () => {
      mockUsersRepositoryFindOneByEmail.mockResolvedValue(null);

      await expect(
        service.login({
          email: USER_MOCK.email,
          password: USER_MOCK.password,
        }),
      ).rejects.toThrow(UserInformationNotMatch);
    });

    it('should throw UserIsNotActive', async () => {
      mockUsersRepositoryFindOneByEmail.mockResolvedValue({
        ...USER_MOCK,
        is_active: false,
      });

      await expect(
        service.login({
          email: USER_MOCK.email,
          password: USER_MOCK.password,
        }),
      ).rejects.toThrow(UserIsNotActive);
    });

    it('should throw UserInformationNotMatch when password does not match', async () => {
      mockUsersRepositoryFindOneByEmail.mockResolvedValue(USER_MOCK);
      mockHashingServiceCompare.mockReturnValue(false);

      await expect(
        service.login({
          email: USER_MOCK.email,
          password: USER_MOCK.password,
        }),
      ).rejects.toThrow(UserInformationNotMatch);
    });
  });

  describe('refreshToken', () => {
    it('should refresh token and return new valid accessToken', async () => {
      mockJwtServiceDecode.mockReturnValue(USER_MOCK);
      mockUsersRepositoryFindOneByEmail.mockResolvedValue(USER_MOCK);
      mockJwtServiceSignAsync.mockResolvedValue(RANDOM_TOKEN_MOCK);

      const result = await service.refreshToken(RANDOM_REFRESH_TOKEN_MOCK);

      expect(mockJwtServiceDecode).toHaveBeenCalledWith(
        RANDOM_REFRESH_TOKEN_MOCK,
      );
      expect(mockUsersRepositoryFindOneByEmail).toHaveBeenCalledWith(
        USER_MOCK.email,
      );
      expect(result).toEqual({
        accessToken: RANDOM_TOKEN_MOCK,
        refreshToken: RANDOM_REFRESH_TOKEN_MOCK,
      });
    });

    it('should throw UnauthorizedException when no payload is found', async () => {
      mockJwtServiceDecode.mockReturnValue(null);

      await expect(
        service.refreshToken(RANDOM_REFRESH_TOKEN_MOCK),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UserInformationNotMatch when no user is found', async () => {
      mockJwtServiceDecode.mockReturnValue(USER_MOCK);
      mockUsersRepositoryFindOneByEmail.mockResolvedValue(null);

      await expect(
        service.refreshToken(RANDOM_REFRESH_TOKEN_MOCK),
      ).rejects.toThrow(UserInformationNotMatch);
    });

    it('should throw UserIsNotActive', async () => {
      mockJwtServiceDecode.mockReturnValue(USER_MOCK);
      mockUsersRepositoryFindOneByEmail.mockResolvedValue({
        ...USER_MOCK,
        is_active: false,
      });

      await expect(
        service.refreshToken(RANDOM_REFRESH_TOKEN_MOCK),
      ).rejects.toThrow(UserIsNotActive);
    });
  });
});

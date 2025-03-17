import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  RANDOM_TOKEN_MOCK,
  LOGIN_REQUEST_MOCK,
  RANDOM_REFRESH_TOKEN_MOCK,
} from '@/auth/mocks';

const mockAuthServiceLogin = jest.fn();
const mockAuthServiceRefreshToken = jest.fn();

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: mockAuthServiceLogin,
            refreshToken: mockAuthServiceRefreshToken,
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call login method of AuthService', async () => {
      mockAuthServiceLogin.mockReturnValue({ accessToken: RANDOM_TOKEN_MOCK });
      const response = await controller.login(LOGIN_REQUEST_MOCK);

      expect(mockAuthServiceLogin).toHaveBeenCalledWith(LOGIN_REQUEST_MOCK);
      expect(response).toEqual({ accessToken: RANDOM_TOKEN_MOCK });
    });
  });

  describe('refreshToken', () => {
    it('should call refreshToken method of AuthService', async () => {
      const data = {
        accessToken: RANDOM_TOKEN_MOCK,
        refreshToken: RANDOM_REFRESH_TOKEN_MOCK,
      };
      mockAuthServiceRefreshToken.mockReturnValue(data);
      const response = await controller.refreshToken({
        refreshToken: data.refreshToken,
      });

      expect(mockAuthServiceRefreshToken).toHaveBeenCalledWith(
        data.refreshToken,
      );
      expect(response).toEqual(data);
    });
  });
});

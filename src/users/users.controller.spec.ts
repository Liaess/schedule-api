import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CREATE_USER_MOCK } from '@/users/mocks';
import { getConstant } from '@/constants/get-constant';

const mockUserServiceCreate = jest.fn();
const mockUserServiceConfirmEmail = jest.fn();

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: mockUserServiceCreate,
            confirmEmail: mockUserServiceConfirmEmail,
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call create method of UsersService', async () => {
      const response = await controller.create(CREATE_USER_MOCK);

      expect(mockUserServiceCreate).toHaveBeenCalledWith(CREATE_USER_MOCK);
      expect(response).toEqual({
        message: getConstant().USER.USER_CREATED_SUCCESSFULLY,
      });
    });
  });

  describe('confirmEmail', () => {
    it('should call confirmEmail method of UsersService', async () => {
      const response = await controller.confirmEmail({ confirmCode: '123' });

      expect(mockUserServiceConfirmEmail).toHaveBeenCalledWith('123');
      expect(response).toEqual({
        message: getConstant().USER.EMAIL_CONFIRMED_SUCCESSFULLY,
      });
    });
  });
});

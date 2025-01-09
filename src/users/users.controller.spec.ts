import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CREATE_USER_MOCK } from '@users/mocks';

const mockUserServiceCreate = jest.fn();

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
      await controller.create(CREATE_USER_MOCK);

      expect(mockUserServiceCreate).toHaveBeenCalledWith(CREATE_USER_MOCK);
    });
  });
});

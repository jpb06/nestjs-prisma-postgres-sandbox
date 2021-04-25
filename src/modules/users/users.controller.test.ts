import { Test, TestingModule } from '@nestjs/testing';
import { mockUsers } from '../../dal/users.mock.data';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = app.get<UsersController>(UsersController);
  });

  describe('root', () => {
    it('should return some users', () => {
      expect(controller.getUsers()).toBe(mockUsers);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { mockedUsersNames } from '@tests/mock-data/users.mock-data';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('Users controller', () => {
  let controller: UsersController;
  const getUsersMock = jest.fn();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: { getUsers: getUsersMock } },
      ],
    }).compile();
    controller = app.get<UsersController>(UsersController);
  });

  it('should return users names', async () => {
    getUsersMock.mockReturnValueOnce(Promise.resolve(mockedUsersNames));

    const result = await controller.getUsers();

    expect(result).toStrictEqual(mockedUsersNames);
  });
});

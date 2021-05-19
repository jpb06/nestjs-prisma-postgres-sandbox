import { Request as ExpressRequest } from 'express';

import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import {
  loggedUserJwtPayload,
  mockedUsers,
} from '@tests/mock-data/users.mock-data';

import { AuthService } from '../auth/auth.service';
import { JwtPayloadDto } from '../auth/dto/jwt.payload.dto';
import { UsersController } from './users.controller';

describe('Users controller', () => {
  let controller: UsersController;
  const getLoggedUserMock = jest.fn();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: { getLoggedUser: getLoggedUserMock },
        },
      ],
    }).compile();
    controller = app.get<UsersController>(UsersController);
  });

  it('should return the user once logged in', async () => {
    getLoggedUserMock.mockReturnValueOnce(Promise.resolve(mockedUsers));

    const result = await controller.login({
      user: mockedUsers[0],
    } as ExpressRequest & { user: User });

    expect(result).toStrictEqual(mockedUsers);
  });

  it('should return the logged user data', () => {
    const result = controller.getProfile({
      user: loggedUserJwtPayload,
    } as ExpressRequest & { user: JwtPayloadDto });

    expect(result).toStrictEqual(loggedUserJwtPayload);
  });
});

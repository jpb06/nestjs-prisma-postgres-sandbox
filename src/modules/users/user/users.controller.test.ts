import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { Request as ExpressRequest } from 'express';
import { mockDeep } from 'jest-mock-extended';

import {
  loggedUser,
  loggedUserJwtPayload,
} from '@tests/mock-data/users.mock-data';

import { UsersController } from './users.controller';
import { AuthService } from '../auth/auth.service';
import { JwtPayloadDto } from '../auth/dto/jwt.payload.dto';

describe('Users controller', () => {
  let controller: UsersController;
  const authServiceMock = mockDeep<AuthService>();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();
    controller = app.get<UsersController>(UsersController);
  });

  it('should return the user once logged in', async () => {
    authServiceMock.getLoggedUser.mockReturnValueOnce(loggedUser);

    const result = await controller.login({
      user: loggedUser,
    } as unknown as ExpressRequest & { user: User });

    expect(result).toStrictEqual(loggedUser);
  });

  it('should return the logged user data', () => {
    const result = controller.getProfile({
      user: loggedUserJwtPayload,
    } as ExpressRequest & { user: JwtPayloadDto });

    expect(result).toStrictEqual(loggedUserJwtPayload);
  });
});

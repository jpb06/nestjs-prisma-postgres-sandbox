import { mockDeep } from 'jest-mock-extended';

import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockedUser } from '@tests/mock-data/users.mock-data';

import { AuthService } from '../auth.service';
import { LocalStrategy } from './local.strategy';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  const authServiceMock = mockDeep<AuthService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should throw an unauthorized exception', async () => {
    authServiceMock.validateUser.mockResolvedValueOnce(null);

    expect(strategy.validate('cool@bro.com', 'yolo')).rejects.toThrowError(
      UnauthorizedException,
    );
  });

  it('should return the user', async () => {
    const user = {
      ...mockedUser,
      id: 1,
      createdAt: new Date(),
      password: 'Yolo',
    };
    authServiceMock.validateUser.mockResolvedValueOnce(user);

    const result = await strategy.validate('cool@bro.com', 'yolo');

    expect(result).toStrictEqual(user);
  });
});

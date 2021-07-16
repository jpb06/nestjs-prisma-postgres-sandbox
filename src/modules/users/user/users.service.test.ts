import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

import { DatabaseService } from '@database/database.service';
import { loggedUser } from '@tests/mock-data/users.mock-data';

import { UsersService } from './users.service';

describe('Users service', () => {
  let service: UsersService;
  const dbMock = mockDeep<PrismaClient>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DatabaseService,
          useValue: dbMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return a user if existing', async () => {
    const user = {
      ...loggedUser,
      password: 'yolo',
    };
    dbMock.user.findFirst.mockResolvedValueOnce(user);

    const result = await service.findOne(user.email);

    expect(result).toStrictEqual(user);
  });
});

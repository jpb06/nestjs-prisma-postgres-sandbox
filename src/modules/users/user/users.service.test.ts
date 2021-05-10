import { Test, TestingModule } from '@nestjs/testing';
import {
  mockedUsers,
  mockedUsersNames,
} from '@tests/mock-data/users.mock-data';
import { mockPrismaService } from '@tests/mocks/prisma-service.mock';

import { DatabaseService } from '../../database/database.service';
import { UsersService } from './users.service';

describe('Users service', () => {
  let service: UsersService;
  const { findManyMock, PrismaServiceMock } = mockPrismaService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DatabaseService,
          useValue: PrismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return users names', async () => {
    findManyMock.mockReturnValue(Promise.resolve(mockedUsers));

    const result = await service.getUsers();

    expect(result).toStrictEqual(mockedUsersNames);
  });
});

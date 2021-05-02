import { Test, TestingModule } from '@nestjs/testing';

import {
  mockedUsers,
  mockedUsersNames,
} from '../../../tests-related/mock-data/users.mock-data';
import { mockPrismaService } from '../../../tests-related/mocks/prisma-service.mock';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../users.service';

describe('Users service', () => {
  let service: UsersService;
  const { findManyMock, PrismaServiceMock } = mockPrismaService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
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

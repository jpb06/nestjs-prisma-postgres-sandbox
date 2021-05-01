import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import {
  mockedUsers,
  mockedUsersNames,
} from '../../../test/mock-data/users.mock-data';
import { mockPrismaService } from '../../../test/mocks/prisma-service.mock';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersModule } from '../users.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  const { findManyMock, PrismaServiceMock } = mockPrismaService();

  beforeEach(async () => {
    const usersModule: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(PrismaService)
      .useValue(PrismaServiceMock)
      .compile();

    app = usersModule.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    findManyMock.mockReturnValue(Promise.resolve(mockedUsers));

    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(mockedUsersNames);
  });
});

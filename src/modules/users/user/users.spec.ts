import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  mockedUsers,
  mockedUsersNames,
} from '@tests/mock-data/users.mock-data';
import { mockPrismaService } from '@tests/mocks/prisma-service.mock';

import { DatabaseService } from '../../database/database.service';
import { UsersModule } from './users.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  const { findManyMock, PrismaServiceMock } = mockPrismaService();

  beforeEach(async () => {
    const usersModule: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(DatabaseService)
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

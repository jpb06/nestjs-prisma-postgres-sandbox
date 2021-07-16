import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { mockDeep } from 'jest-mock-extended';
import jwt from 'jsonwebtoken';
import request from 'supertest';

import { DatabaseService } from '@database/database.service';
import { loggedUser, mockedUser } from '@tests/mock-data/users.mock-data';

import { UsersModule } from './users.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  const dbMock = mockDeep<PrismaClient>();

  beforeEach(async () => {
    const usersModule: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(DatabaseService)
      .useValue(dbMock)
      .compile();

    app = usersModule.createNestApplication();
    await app.init();
  });

  describe('POST /users/login', () => {
    it('should return unauthorized if login has failed', async () => {
      const password = await bcrypt.hash('pwd', 11);
      dbMock.user.findFirst.mockResolvedValueOnce({
        ...loggedUser,
        password,
      });

      return request(app.getHttpServer())
        .post('/users/login')
        .send({ username: loggedUser.email, password: 'yolo' })
        .expect(401);
    });

    it('should log the user', async () => {
      const password = await bcrypt.hash('pwd', 11);
      dbMock.user.findFirst.mockResolvedValueOnce({
        ...loggedUser,
        password,
      });

      const { body } = await request(app.getHttpServer())
        .post('/users/login')
        .send({ username: loggedUser.email, password: 'pwd' })
        .expect(201);

      expect(body).toEqual(
        expect.objectContaining({
          ...mockedUser,
        }),
      );
    });
  });

  describe('GET /users/profile', () => {
    it('return authorized if not logged', () => {
      return request(app.getHttpServer())
        .get('/users/profile')
        .send()
        .expect(401);
    });

    it('return the user profile', async () => {
      const payload = { cool: 'yolo' };
      const token = jwt.sign(payload, process.env.JWT_SECRET || '');

      const { body } = await request(app.getHttpServer())
        .get('/users/profile')
        .auth(token, { type: 'bearer' })
        .send()
        .expect(200);
      expect(body).toEqual(
        expect.objectContaining({
          ...payload,
        }),
      );
    });
  });
});

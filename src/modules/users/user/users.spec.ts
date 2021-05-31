import bcrypt from 'bcrypt';
import { mockDeep } from 'jest-mock-extended';
import jwt from 'jsonwebtoken';
import request from 'supertest';

import { DatabaseService } from '@database/database.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
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
    it('should return unauthorized if login has failed', async (done) => {
      const password = await bcrypt.hash('pwd', 11);
      dbMock.user.findFirst.mockResolvedValueOnce({
        ...loggedUser,
        password,
      });

      request(app.getHttpServer())
        .post('/users/login')
        .send({ username: loggedUser.email, password: 'yolo' })
        .expect(401, done);
    });

    it('should log the user', async (done) => {
      const password = await bcrypt.hash('pwd', 11);
      dbMock.user.findFirst.mockResolvedValueOnce({
        ...loggedUser,
        password,
      });

      request(app.getHttpServer())
        .post('/users/login')
        .send({ username: loggedUser.email, password: 'pwd' })
        .expect(201)
        .end((err, res) => {
          if (err) {
            done.fail();
          }
          expect(res.body).toEqual(
            expect.objectContaining({
              ...mockedUser,
            }),
          );
          done();
        });
    });
  });

  describe('GET /users/profile', () => {
    it('return authorized if not logged', async (done) => {
      request(app.getHttpServer())
        .get('/users/profile')
        .send()
        .expect(401, done);
    });

    it('return the user profile', async (done) => {
      const payload = { cool: 'yolo' };
      const token = jwt.sign(payload, process.env.JWT_SECRET || '');

      request(app.getHttpServer())
        .get('/users/profile')
        .auth(token, { type: 'bearer' })
        .send()
        .expect(200)
        .end((err, res) => {
          if (err) {
            done.fail();
          }
          expect(res.body).toEqual(
            expect.objectContaining({
              ...payload,
            }),
          );
          done();
        });
    });
  });
});

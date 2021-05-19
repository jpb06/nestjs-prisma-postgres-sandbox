import bcrypt from 'bcrypt';
import { mockDeep } from 'jest-mock-extended';
import jwt from 'jsonwebtoken';
import request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { mockedUser, mockedUsers } from '@tests/mock-data/users.mock-data';

import { DatabaseService } from '../../database/database.service';
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

  it('POST /user/login', async (done) => {
    const password = await bcrypt.hash('pwd', 11);
    dbMock.user.findFirst.mockResolvedValueOnce({
      ...mockedUsers[0],
      password,
    });

    request(app.getHttpServer())
      .post('/user/login')
      .send({ username: mockedUsers[0].email, password: 'pwd' })
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

  it('GET /user/profile', async (done) => {
    const payload = { cool: 'yolo' };
    const token = jwt.sign(payload, process.env.JWT_SECRET || '');

    request(app.getHttpServer())
      .get('/user/profile')
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

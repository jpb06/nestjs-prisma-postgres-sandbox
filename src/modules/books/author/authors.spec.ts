import { mockDeep } from 'jest-mock-extended';
import jwt from 'jsonwebtoken';
import request from 'supertest';

import { DatabaseService } from '@database/database.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import {
  mockedAuthor,
  mockedAuthors,
} from '@tests/mock-data/authors.mock-data';
import { mockedBooks } from '@tests/mock-data/books.mock-data';
import { asDateString } from '@tests/util/as.date.string';

import { AuthorsModule } from './authors.module';

describe('AuthorsController (e2e)', () => {
  let app: INestApplication;
  const dbMock = mockDeep<PrismaClient>();
  const payload = { cool: 'yolo' };
  const token = jwt.sign(payload, process.env.JWT_SECRET || '');

  beforeEach(async () => {
    const usersModule: TestingModule = await Test.createTestingModule({
      imports: [AuthorsModule],
    })
      .overrideProvider(DatabaseService)
      .useValue(dbMock)
      .compile();

    app = usersModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('GET /authors', () => {
    it('should return 401 if not authenticated', async (done) => {
      request(app.getHttpServer()).get('/authors').send().expect(401, done);
    });

    it('should return authors', async (done) => {
      dbMock.author.findMany.mockResolvedValueOnce(mockedAuthors);

      request(app.getHttpServer())
        .get('/authors')
        .auth(token, { type: 'bearer' })
        .send()
        .expect(200)
        .end((err, res) => {
          if (err) {
            done.fail();
          }
          expect(res.body).toStrictEqual(
            mockedAuthors.map((el) => asDateString(el)),
          );
          done();
        });
    });
  });

  describe('POST /authors', () => {
    it('should return 401 if not authenticated', async (done) => {
      request(app.getHttpServer()).post('/authors').send({}).expect(401, done);
    });

    it('should return 400 if input is invalid', async (done) => {
      request(app.getHttpServer())
        .post('/authors')
        .auth(token, { type: 'bearer' })
        .send({})
        .expect(400, done);
    });

    it('should create an author', async (done) => {
      dbMock.author.create.mockResolvedValueOnce(mockedAuthor);

      request(app.getHttpServer())
        .post('/authors')
        .auth(token, { type: 'bearer' })
        .send({
          name: 'yolo',
        })
        .expect(201, asDateString(mockedAuthor), done);
    });
  });

  describe('PUT /authors/{id}', () => {
    it('should return 401 if not authenticated', async (done) => {
      request(app.getHttpServer()).put('/authors/1').send().expect(401, done);
    });

    it('should return 400 if input is invalid', async (done) => {
      request(app.getHttpServer())
        .put('/authors/1')
        .auth(token, { type: 'bearer' })
        .send({})
        .expect(400, done);
    });

    it('should return 404 if the author does not exist', async (done) => {
      request(app.getHttpServer())
        .put('/authors/23')
        .auth(token, { type: 'bearer' })
        .send({
          name: 'yolo',
        })
        .expect(404, done);
    });

    it('should update an author', (done) => {
      dbMock.author.findFirst.mockResolvedValueOnce(mockedAuthor);
      dbMock.author.update.mockResolvedValueOnce(mockedAuthor);

      request(app.getHttpServer())
        .put('/authors/1')
        .auth(token, { type: 'bearer' })
        .send({
          name: 'yolo',
        })
        .expect(200, asDateString(mockedAuthor), done);
    });
  });

  describe('DELETE /authors/{id}', () => {
    it('should return 401 if not authenticated', async (done) => {
      request(app.getHttpServer())
        .delete('/authors/1')
        .send()
        .expect(401, done);
    });

    it('should return 404 if the author does not exist', async (done) => {
      request(app.getHttpServer())
        .delete('/authors/23')
        .auth(token, { type: 'bearer' })
        .send()
        .expect(404, done);
    });

    it('should delete an author', (done) => {
      dbMock.author.findFirst.mockResolvedValueOnce(mockedAuthor);
      dbMock.author.delete.mockResolvedValueOnce(mockedAuthor);

      request(app.getHttpServer())
        .delete('/authors/1')
        .auth(token, { type: 'bearer' })
        .send()
        .expect(200, asDateString(mockedAuthor), done);
    });
  });

  describe('GET /authors/{id}/books', () => {
    it('should return 401 if not authenticated', async (done) => {
      request(app.getHttpServer())
        .get('/authors/1/books')
        .send()
        .expect(401, done);
    });

    it('should return 404 if the author does not exist', async (done) => {
      request(app.getHttpServer())
        .get('/authors/23/books')
        .auth(token, { type: 'bearer' })
        .send()
        .expect(404, done);
    });

    it('should return books written by the chosen author', (done) => {
      dbMock.author.findFirst.mockResolvedValueOnce(mockedAuthor);
      dbMock.book.findMany.mockResolvedValueOnce(mockedBooks);

      request(app.getHttpServer())
        .get('/authors/1/books')
        .auth(token, { type: 'bearer' })
        .send()
        .expect(200, mockedBooks.map(asDateString), done);
    });
  });
});

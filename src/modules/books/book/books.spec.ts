import { mockDeep } from 'jest-mock-extended';
import jwt from 'jsonwebtoken';
import request from 'supertest';

import { DatabaseService } from '@database/database.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { mockedBook, mockedBooks } from '@tests/mock-data/books.mock-data';
import { asDateString } from '@tests/util/as.date.string';

import { BooksModule } from './books.module';

describe('BooksController (e2e)', () => {
  let app: INestApplication;
  const dbMock = mockDeep<PrismaClient>();
  const payload = { cool: 'yolo' };
  const token = jwt.sign(payload, process.env.JWT_SECRET || '');

  beforeEach(async () => {
    const usersModule: TestingModule = await Test.createTestingModule({
      imports: [BooksModule],
    })
      .overrideProvider(DatabaseService)
      .useValue(dbMock)
      .compile();

    app = usersModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('GET /books', () => {
    it('should return 401 if not authenticated', async (done) => {
      request(app.getHttpServer()).get('/books').send().expect(401, done);
    });

    it('should return books', async (done) => {
      dbMock.book.findMany.mockResolvedValueOnce(mockedBooks);

      request(app.getHttpServer())
        .get('/books')
        .auth(token, { type: 'bearer' })
        .send()
        .expect(200)
        .end((err, res) => {
          if (err) {
            done.fail();
          }
          expect(res.body).toStrictEqual(
            mockedBooks.map((el) => asDateString(el)),
          );
          done();
        });
    });
  });

  describe('POST /books', () => {
    it('should return 401 if not authenticated', async (done) => {
      request(app.getHttpServer()).post('/books').send({}).expect(401, done);
    });

    it('should return 400 if input is invalid', async (done) => {
      request(app.getHttpServer())
        .post('/books')
        .auth(token, { type: 'bearer' })
        .send({})
        .expect(400, done);
    });

    it('should create a book', async (done) => {
      dbMock.book.create.mockResolvedValueOnce(mockedBook);

      request(app.getHttpServer())
        .post('/books')
        .auth(token, { type: 'bearer' })
        .send({
          idAuthor: 1,
          idCategory: 1,
          name: 'yolo',
        })
        .expect(201, asDateString(mockedBook), done);
    });
  });

  describe('PUT /books/{id}', () => {
    it('should return 401 if not authenticated', async (done) => {
      request(app.getHttpServer()).put('/books/1').send().expect(401, done);
    });

    it('should return 400 if input is invalid', async (done) => {
      request(app.getHttpServer())
        .put('/books/1')
        .auth(token, { type: 'bearer' })
        .send({})
        .expect(400, done);
    });

    it('should return 404 if the book does not exist', async (done) => {
      request(app.getHttpServer())
        .put('/books/23')
        .auth(token, { type: 'bearer' })
        .send({
          idAuthor: 1,
          idCategory: 1,
          name: 'yolo',
        })
        .expect(404, done);
    });

    it('should update a book', (done) => {
      dbMock.book.findFirst.mockResolvedValueOnce(mockedBook);
      dbMock.book.update.mockResolvedValueOnce(mockedBook);

      request(app.getHttpServer())
        .put('/books/1')
        .auth(token, { type: 'bearer' })
        .send({
          idAuthor: 1,
          idCategory: 1,
          name: 'yolo',
        })
        .expect(200, asDateString(mockedBook), done);
    });
  });

  describe('DELETE /books/{id}', () => {
    it('should return 401 if not authenticated', async (done) => {
      request(app.getHttpServer()).delete('/books/1').send().expect(401, done);
    });

    it('should return 404 if the book does not exist', async (done) => {
      request(app.getHttpServer())
        .delete('/books/23')
        .auth(token, { type: 'bearer' })
        .send()
        .expect(404, done);
    });

    it('should delete a book', (done) => {
      dbMock.book.findFirst.mockResolvedValueOnce(mockedBook);
      dbMock.book.delete.mockResolvedValueOnce(mockedBook);

      request(app.getHttpServer())
        .delete('/books/1')
        .auth(token, { type: 'bearer' })
        .send()
        .expect(200, asDateString(mockedBook), done);
    });
  });
});

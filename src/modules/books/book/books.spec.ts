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
    const module: TestingModule = await Test.createTestingModule({
      imports: [BooksModule],
    })
      .overrideProvider(DatabaseService)
      .useValue(dbMock)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('GET /books', () => {
    it('should return 401 if not authenticated', () => {
      return request(app.getHttpServer()).get('/books').send().expect(401);
    });

    it('should return books', async () => {
      dbMock.book.findMany.mockResolvedValueOnce(mockedBooks);

      const { body } = await request(app.getHttpServer())
        .get('/books')
        .auth(token, { type: 'bearer' })
        .send()
        .expect(200);
      expect(body).toStrictEqual(mockedBooks.map((el) => asDateString(el)));
    });
  });

  describe('POST /books', () => {
    it('should return 401 if not authenticated', () => {
      return request(app.getHttpServer()).post('/books').send({}).expect(401);
    });

    it('should return 400 if input is invalid', () => {
      return request(app.getHttpServer())
        .post('/books')
        .auth(token, { type: 'bearer' })
        .send({})
        .expect(400);
    });

    it('should create a book', () => {
      dbMock.book.create.mockResolvedValueOnce(mockedBook);

      return request(app.getHttpServer())
        .post('/books')
        .auth(token, { type: 'bearer' })
        .send({
          idAuthor: 1,
          idCategory: 1,
          name: 'yolo',
        })
        .expect(201, asDateString(mockedBook));
    });
  });

  describe('PUT /books/{id}', () => {
    it('should return 401 if not authenticated', () => {
      return request(app.getHttpServer()).put('/books/1').send().expect(401);
    });

    it('should return 400 if input is invalid', () => {
      return request(app.getHttpServer())
        .put('/books/1')
        .auth(token, { type: 'bearer' })
        .send({})
        .expect(400);
    });

    it('should return 404 if the book does not exist', () => {
      return request(app.getHttpServer())
        .put('/books/23')
        .auth(token, { type: 'bearer' })
        .send({
          idAuthor: 1,
          idCategory: 1,
          name: 'yolo',
        })
        .expect(404);
    });

    it('should update a book', () => {
      dbMock.book.findFirst.mockResolvedValueOnce(mockedBook);
      dbMock.book.update.mockResolvedValueOnce(mockedBook);

      return request(app.getHttpServer())
        .put('/books/1')
        .auth(token, { type: 'bearer' })
        .send({
          idAuthor: 1,
          idCategory: 1,
          name: 'yolo',
        })
        .expect(200, asDateString(mockedBook));
    });
  });

  describe('DELETE /books/{id}', () => {
    it('should return 401 if not authenticated', () => {
      return request(app.getHttpServer()).delete('/books/1').send().expect(401);
    });

    it('should return 404 if the book does not exist', () => {
      return request(app.getHttpServer())
        .delete('/books/23')
        .auth(token, { type: 'bearer' })
        .send()
        .expect(404);
    });

    it('should delete a book', () => {
      dbMock.book.findFirst.mockResolvedValueOnce(mockedBook);
      dbMock.book.delete.mockResolvedValueOnce(mockedBook);

      return request(app.getHttpServer())
        .delete('/books/1')
        .auth(token, { type: 'bearer' })
        .send()
        .expect(200, asDateString(mockedBook));
    });
  });
});

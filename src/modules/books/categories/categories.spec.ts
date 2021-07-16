import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
import jwt from 'jsonwebtoken';
import request from 'supertest';

import { DatabaseService } from '@database/database.service';
import {
  mockedCategories,
  mockedCategory,
} from '@tests/mock-data/categories.mock-data';
import { asDateString } from '@tests/util/as.date.string';

import { CategoriesModule } from './categories.module';

describe('CategoriesController (e2e)', () => {
  let app: INestApplication;
  const dbMock = mockDeep<PrismaClient>();
  const payload = { cool: 'yolo' };
  const token = jwt.sign(payload, process.env.JWT_SECRET || '');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CategoriesModule],
    })
      .overrideProvider(DatabaseService)
      .useValue(dbMock)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('GET /categories', () => {
    it('should return 401 if not authenticated', () => {
      return request(app.getHttpServer()).get('/categories').send().expect(401);
    });

    it('should return categories', async () => {
      dbMock.category.findMany.mockResolvedValueOnce(mockedCategories);

      const { body } = await request(app.getHttpServer())
        .get('/categories')
        .auth(token, { type: 'bearer' })
        .send()
        .expect(200);
      expect(body).toStrictEqual(
        mockedCategories.map((el) => asDateString(el)),
      );
    });
  });

  describe('POST /categories', () => {
    it('should return 401 if not authenticated', () => {
      return request(app.getHttpServer())
        .post('/categories')
        .send({})
        .expect(401);
    });

    it('should return 400 if input is invalid', () => {
      return request(app.getHttpServer())
        .post('/categories')
        .auth(token, { type: 'bearer' })
        .send({})
        .expect(400);
    });

    it('should create a category', () => {
      dbMock.category.create.mockResolvedValueOnce(mockedCategory);

      return request(app.getHttpServer())
        .post('/categories')
        .auth(token, { type: 'bearer' })
        .send({
          name: 'yolo',
        })
        .expect(201, asDateString(mockedCategory));
    });
  });

  describe('PUT /categories/{id}', () => {
    it('should return 401 if not authenticated', () => {
      return request(app.getHttpServer())
        .put('/categories/1')
        .send()
        .expect(401);
    });

    it('should return 400 if input is invalid', () => {
      return request(app.getHttpServer())
        .put('/categories/1')
        .auth(token, { type: 'bearer' })
        .send({})
        .expect(400);
    });

    it('should return 404 if the category does not exist', () => {
      return request(app.getHttpServer())
        .put('/categories/23')
        .auth(token, { type: 'bearer' })
        .send({
          name: 'yolo',
        })
        .expect(404);
    });

    it('should update a category', () => {
      dbMock.category.findFirst.mockResolvedValueOnce(mockedCategory);
      dbMock.category.update.mockResolvedValueOnce(mockedCategory);

      return request(app.getHttpServer())
        .put('/categories/1')
        .auth(token, { type: 'bearer' })
        .send({
          name: 'yolo',
        })
        .expect(200, asDateString(mockedCategory));
    });
  });

  describe('DELETE /categories/{id}', () => {
    it('should return 401 if not authenticated', () => {
      return request(app.getHttpServer())
        .delete('/categories/1')
        .send()
        .expect(401);
    });

    it('should return 404 if the category does not exist', () => {
      return request(app.getHttpServer())
        .delete('/categories/23')
        .auth(token, { type: 'bearer' })
        .send()
        .expect(404);
    });

    it('should delete a category', () => {
      dbMock.category.findFirst.mockResolvedValueOnce(mockedCategory);
      dbMock.category.delete.mockResolvedValueOnce(mockedCategory);

      return request(app.getHttpServer())
        .delete('/categories/1')
        .auth(token, { type: 'bearer' })
        .send()
        .expect(200, asDateString(mockedCategory));
    });
  });
});

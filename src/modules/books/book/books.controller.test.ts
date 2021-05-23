import { Test, TestingModule } from '@nestjs/testing';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('Books controller', () => {
  let controller: BooksController;
  const getAllMock = jest.fn();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: { getAll: getAllMock },
        },
      ],
    }).compile();
    controller = app.get<BooksController>(BooksController);
  });

  it("should just return books y'know", async () => {
    getAllMock.mockResolvedValueOnce([]);

    const result = await controller.getBooks();

    expect(result).toStrictEqual([]);
  });
});

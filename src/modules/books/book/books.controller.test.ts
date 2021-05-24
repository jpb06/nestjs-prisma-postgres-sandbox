import { mockDeep } from 'jest-mock-extended';

import { Test, TestingModule } from '@nestjs/testing';
import { mockedBooks, newMockedBook } from '@tests/mock-data/books.mock-data';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('Books controller', () => {
  let controller: BooksController;
  const serviceMock = mockDeep<BooksService>();
  const book = mockedBooks[0];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: serviceMock,
        },
      ],
    }).compile();
    controller = app.get<BooksController>(BooksController);
  });

  it("should just return books y'know", async () => {
    serviceMock.getAll.mockResolvedValueOnce(mockedBooks);

    const result = await controller.getBooks();

    expect(result).toStrictEqual(mockedBooks);
  });

  it('should create a book', async () => {
    serviceMock.create.mockResolvedValueOnce(book);

    const result = await controller.createBook(newMockedBook);

    expect(result).toStrictEqual(book);
  });

  it('should update a book', async () => {
    serviceMock.update.mockResolvedValueOnce(book);

    const result = await controller.updateBook(book.id, book);

    expect(result).toStrictEqual(book);
  });

  it('should delete a book', async () => {
    serviceMock.deleteById.mockResolvedValueOnce(book);

    const result = await controller.deleteBook(book.id);

    expect(result).toStrictEqual(book);
  });
});

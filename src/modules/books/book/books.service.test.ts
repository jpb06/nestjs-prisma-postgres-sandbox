import { mockDeep } from 'jest-mock-extended';

import { DatabaseService } from '@database/database.service';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import {
  mockedBook,
  mockedUpdatedBook,
} from '@tests/mock-data/books.mock-data';

import { BooksService } from './books.service';

describe('Books service', () => {
  let service: BooksService;
  const dbMock = mockDeep<PrismaClient>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: DatabaseService,
          useValue: dbMock,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should create a book', async () => {
    const newBook = {
      idAuthor: 1,
      idCategory: 1,
      name: 'Hyperion',
      publicationDate: 1989,
    };
    const persistedBook = {
      id: 1,
      createdAt: new Date(),
      ...newBook,
    };
    dbMock.book.create.mockResolvedValueOnce(persistedBook);

    const result = await service.create(newBook);

    expect(dbMock.book.create).toHaveBeenCalledWith({
      data: newBook,
    });
    expect(result).toStrictEqual(persistedBook);
  });

  it('should throw an error if the book to update does not exist', async () => {
    dbMock.book.findFirst.mockResolvedValueOnce(null);

    expect(service.update(1, mockedUpdatedBook)).rejects.toThrowError(
      new NotFoundException(),
    );
  });

  it('should update a book', async () => {
    dbMock.book.findFirst.mockResolvedValueOnce(mockedBook);
    dbMock.book.update.mockResolvedValueOnce(mockedUpdatedBook);

    const result = await service.update(1, mockedUpdatedBook);

    expect(dbMock.book.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: mockedUpdatedBook,
    });
    expect(result).toStrictEqual(mockedUpdatedBook);
  });

  it('should throw an error if the book to delete does not exist', async () => {
    dbMock.book.findFirst.mockResolvedValueOnce(null);

    expect(service.deleteById(1)).rejects.toThrowError(new NotFoundException());
  });

  it('should delete a book', async () => {
    dbMock.book.findFirst.mockResolvedValueOnce(mockedBook);
    dbMock.book.delete.mockResolvedValueOnce(mockedBook);

    const result = await service.deleteById(mockedBook.id);

    expect(dbMock.book.delete).toHaveBeenCalledWith({
      where: {
        id: mockedBook.id,
      },
    });
    expect(result).toStrictEqual(mockedBook);
  });

  it('should get all books', async () => {
    const books = [
      {
        id: 1,
        idAuthor: 1,
        idCategory: 1,
        name: 'Hyperion',
        publicationDate: 1989,
        createdAt: new Date(),
      },
      {
        id: 2,
        idAuthor: 1,
        idCategory: 1,
        name: 'Yola',
        publicationDate: 2020,
        createdAt: new Date(),
      },
    ];
    dbMock.book.findMany.mockResolvedValueOnce(books);

    const result = await service.getAll();

    expect(result).toStrictEqual(books);
  });

  it('should get a book by its name', async () => {
    const name = 'Hyperion';

    dbMock.book.findFirst.mockResolvedValueOnce(mockedBook);

    const result = await service.getByName(name);

    expect(dbMock.book.findFirst).toHaveBeenCalledWith({
      where: {
        name,
      },
    });
    expect(result).toStrictEqual(mockedBook);
  });
});

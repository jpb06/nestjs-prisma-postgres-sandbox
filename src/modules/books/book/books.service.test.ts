import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

import { DatabaseService } from '@database/database.service';
import { mockedAuthor } from '@tests/mock-data/authors.mock-data';
import {
  mockedBook,
  mockedBooks,
  mockedUpdatedBook,
  newMockedBook,
} from '@tests/mock-data/books.mock-data';

import { BooksService } from './books.service';
import { AuthorsService } from '../author/authors.service';

describe('Books service', () => {
  let service: BooksService;
  const dbMock = mockDeep<PrismaClient>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        AuthorsService,
        {
          provide: DatabaseService,
          useValue: dbMock,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should create a book', async () => {
    dbMock.book.create.mockResolvedValueOnce(mockedBook);

    const result = await service.create(newMockedBook);

    expect(dbMock.book.create).toHaveBeenCalledWith({
      data: newMockedBook,
    });
    expect(result).toStrictEqual(mockedBook);
  });

  it('should throw an error if the book to update does not exist', async () => {
    dbMock.book.findFirst.mockResolvedValueOnce(null);

    await expect(service.update(1, mockedUpdatedBook)).rejects.toThrow(
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

    await expect(service.deleteById(1)).rejects.toThrow(
      new NotFoundException(),
    );
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
    dbMock.book.findMany.mockResolvedValueOnce(mockedBooks);

    const result = await service.getAll();

    expect(result).toStrictEqual(mockedBooks);
  });

  it('should get a book by its id', async () => {
    const id = 1;

    dbMock.book.findFirst.mockResolvedValueOnce(mockedBook);

    const result = await service.getById(id);

    expect(dbMock.book.findFirst).toHaveBeenCalledWith({
      where: {
        id,
      },
    });
    expect(result).toStrictEqual(mockedBook);
  });

  it('should throw a not found error if author does not exist', async () => {
    dbMock.author.findFirst.mockResolvedValueOnce(null);

    await expect(service.getByAuthorId(1)).rejects.toThrow(
      new NotFoundException(),
    );
  });

  it('should get books by their author id', async () => {
    const id = 1;

    dbMock.author.findFirst.mockResolvedValueOnce(mockedAuthor);
    dbMock.book.findMany.mockResolvedValueOnce(mockedBooks);

    const result = await service.getByAuthorId(id);

    expect(dbMock.book.findMany).toHaveBeenCalledWith({
      where: {
        idAuthor: id,
      },
    });
    expect(result).toStrictEqual(mockedBooks);
  });

  it('should get several authors books', async () => {
    dbMock.book.findMany.mockResolvedValueOnce(mockedBooks);

    const idAuthors = [1, 2];
    const result = await service.getBy(idAuthors);

    expect(dbMock.book.findMany).toHaveBeenCalledWith({
      where: {
        idAuthor: { in: idAuthors },
      },
    });
    expect(result).toStrictEqual(mockedBooks);
  });
});

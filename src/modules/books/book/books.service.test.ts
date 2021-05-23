import { mockDeep } from 'jest-mock-extended';

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';

import { DatabaseService } from '../../database/database.service';
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

  it('should update a book', async () => {
    const book = {
      id: 1,
      idAuthor: 1,
      idCategory: 1,
      name: 'Hyperion',
      publicationDate: 1989,
      createdAt: new Date(),
    };
    const updatedBook = { ...book, name: 'yolo' };
    dbMock.book.update.mockResolvedValueOnce(updatedBook);

    const result = await service.update(updatedBook);

    expect(dbMock.book.update).toHaveBeenCalledWith({
      where: { id: updatedBook.id },
      data: updatedBook,
    });
    expect(result).toStrictEqual(updatedBook);
  });

  it('should delete a book', async () => {
    const book = {
      id: 1,
      idAuthor: 1,
      idCategory: 1,
      name: 'Hyperion',
      publicationDate: 1989,
      createdAt: new Date(),
    };
    dbMock.book.delete.mockResolvedValueOnce(book);

    const result = await service.deleteById(book.id);

    expect(dbMock.book.delete).toHaveBeenCalledWith({
      where: {
        id: book.id,
      },
    });
    expect(result).toStrictEqual(book);
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
    const book = {
      id: 1,
      idAuthor: 1,
      idCategory: 1,
      name,
      publicationDate: 1989,
      createdAt: new Date(),
    };

    dbMock.book.findFirst.mockResolvedValueOnce(book);

    const result = await service.getByName(name);

    expect(dbMock.book.findFirst).toHaveBeenCalledWith({
      where: {
        name,
      },
    });
    expect(result).toStrictEqual(book);
  });
});

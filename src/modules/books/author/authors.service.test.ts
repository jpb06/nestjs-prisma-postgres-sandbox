import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

import { DatabaseService } from '@database/database.service';
import {
  mockedAuthor,
  mockedAuthors,
  mockedUpdatedAuthor,
  newMockedAuthor,
} from '@tests/mock-data/authors.mock-data';

import { AuthorsService } from './authors.service';

describe('Authors service', () => {
  let service: AuthorsService;
  const dbMock = mockDeep<PrismaClient>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: DatabaseService,
          useValue: dbMock,
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should create an author', async () => {
    dbMock.author.create.mockResolvedValueOnce(mockedAuthor);

    const result = await service.create(newMockedAuthor);

    expect(dbMock.author.create).toHaveBeenCalledWith({
      data: newMockedAuthor,
    });
    expect(result).toStrictEqual(mockedAuthor);
  });

  it('should throw an error if the author to update does not exist', async () => {
    dbMock.author.findFirst.mockResolvedValueOnce(null);

    await expect(service.update(1, mockedUpdatedAuthor)).rejects.toThrow(
      new NotFoundException(),
    );
  });

  it('should update an author', async () => {
    dbMock.author.findFirst.mockResolvedValueOnce(mockedAuthor);
    dbMock.author.update.mockResolvedValueOnce(mockedUpdatedAuthor);

    const result = await service.update(1, mockedUpdatedAuthor);

    expect(dbMock.author.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: mockedUpdatedAuthor,
    });
    expect(result).toStrictEqual(mockedUpdatedAuthor);
  });

  it('should throw an error if the author to delete does not exist', async () => {
    dbMock.author.findFirst.mockResolvedValueOnce(null);

    await expect(service.deleteById(1)).rejects.toThrow(
      new NotFoundException(),
    );
  });

  it('should delete an author', async () => {
    dbMock.author.findFirst.mockResolvedValueOnce(mockedAuthor);
    dbMock.author.delete.mockResolvedValueOnce(mockedAuthor);

    const result = await service.deleteById(mockedAuthor.id);

    expect(dbMock.author.delete).toHaveBeenCalledWith({
      where: {
        id: mockedAuthor.id,
      },
    });
    expect(result).toStrictEqual(mockedAuthor);
  });

  it('should get all authors', async () => {
    dbMock.author.findMany.mockResolvedValueOnce(mockedAuthors);

    const result = await service.getAll();

    expect(result).toStrictEqual(mockedAuthors);
  });

  it('should get an author by its id', async () => {
    const id = 1;
    dbMock.author.findFirst.mockResolvedValueOnce(mockedAuthor);

    const result = await service.getById(id);

    expect(dbMock.author.findFirst).toHaveBeenCalledWith({
      where: {
        id,
      },
    });
    expect(result).toStrictEqual(mockedAuthor);
  });
});

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

import { DatabaseService } from '@database/database.service';
import {
  mockedCategories,
  mockedCategory,
  mockedUpdatedCategory,
  newMockedCategory,
} from '@tests/mock-data/categories.mock-data';

import { CategoriesService } from './categories.service';

describe('Categories service', () => {
  let service: CategoriesService;
  const dbMock = mockDeep<PrismaClient>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: DatabaseService,
          useValue: dbMock,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should create a category', async () => {
    dbMock.category.create.mockResolvedValueOnce(mockedCategory);

    const result = await service.create(newMockedCategory);

    expect(dbMock.category.create).toHaveBeenCalledWith({
      data: newMockedCategory,
    });
    expect(result).toStrictEqual(mockedCategory);
  });

  it('should throw an error if the category to update does not exist', async () => {
    dbMock.category.findFirst.mockResolvedValueOnce(null);

    await expect(service.update(1, mockedUpdatedCategory)).rejects.toThrow(
      new NotFoundException(),
    );
  });

  it('should update a category', async () => {
    dbMock.category.findFirst.mockResolvedValueOnce(mockedCategory);
    dbMock.category.update.mockResolvedValueOnce(mockedUpdatedCategory);

    const result = await service.update(1, mockedUpdatedCategory);

    expect(dbMock.category.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: mockedUpdatedCategory,
    });
    expect(result).toStrictEqual(mockedUpdatedCategory);
  });

  it('should throw an error if the category to delete does not exist', async () => {
    dbMock.category.findFirst.mockResolvedValueOnce(null);

    await expect(service.deleteById(1)).rejects.toThrow(
      new NotFoundException(),
    );
  });

  it('should delete a category', async () => {
    dbMock.category.findFirst.mockResolvedValueOnce(mockedCategory);
    dbMock.category.delete.mockResolvedValueOnce(mockedCategory);

    const result = await service.deleteById(mockedCategory.id);

    expect(dbMock.category.delete).toHaveBeenCalledWith({
      where: {
        id: mockedCategory.id,
      },
    });
    expect(result).toStrictEqual(mockedCategory);
  });

  it('should get all categories', async () => {
    dbMock.category.findMany.mockResolvedValueOnce(mockedCategories);

    const result = await service.getAll();

    expect(result).toStrictEqual(mockedCategories);
  });

  it('should get a category by its id', async () => {
    const id = 1;
    dbMock.category.findFirst.mockResolvedValueOnce(mockedCategory);

    const result = await service.getById(id);

    expect(dbMock.category.findFirst).toHaveBeenCalledWith({
      where: {
        id,
      },
    });
    expect(result).toStrictEqual(mockedCategory);
  });
});

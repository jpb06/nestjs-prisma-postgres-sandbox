import { DatabaseService } from '@modules/database/database.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '@prisma/client';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private db: DatabaseService) {}

  async create(author: CreateCategoryDto): Promise<Category> {
    return this.db.category.create({
      data: author,
    });
  }

  async update(id: number, author: UpdateCategoryDto): Promise<Category> {
    const existingAuthor = await this.getById(id);
    if (!existingAuthor) {
      throw new NotFoundException();
    }

    return this.db.category.update({
      where: { id },
      data: author,
    });
  }

  async deleteById(id: number): Promise<Category> {
    const author = await this.getById(id);
    if (!author) {
      throw new NotFoundException();
    }

    return this.db.category.delete({
      where: {
        id,
      },
    });
  }

  async getAll(): Promise<Array<Category>> {
    return this.db.category.findMany();
  }

  async getById(id: number): Promise<Category | null> {
    return this.db.category.findFirst({
      where: {
        id,
      },
    });
  }
}

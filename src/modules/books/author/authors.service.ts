import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from '@prisma/client';

import { DatabaseService } from '@modules/database/database.service';

import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private db: DatabaseService) {}

  async create(author: CreateAuthorDto): Promise<Author> {
    return this.db.author.create({
      data: author,
    });
  }

  async update(id: number, author: UpdateAuthorDto): Promise<Author> {
    const existingAuthor = await this.getById(id);
    if (!existingAuthor) {
      throw new NotFoundException();
    }

    return this.db.author.update({
      where: { id },
      data: author,
    });
  }

  async deleteById(id: number): Promise<Author> {
    const author = await this.getById(id);
    if (!author) {
      throw new NotFoundException();
    }

    return this.db.author.delete({
      where: {
        id,
      },
    });
  }

  async getAll(): Promise<Array<Author>> {
    return this.db.author.findMany();
  }

  async getById(id: number): Promise<Author | null> {
    return this.db.author.findFirst({
      where: {
        id,
      },
    });
  }
}

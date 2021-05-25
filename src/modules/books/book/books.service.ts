import { DatabaseService } from '@database/database.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from '@prisma/client';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private db: DatabaseService) {}

  async create(book: CreateBookDto): Promise<Book> {
    return this.db.book.create({
      data: book,
    });
  }

  async update(id: number, book: UpdateBookDto): Promise<Book> {
    const existingBook = await this.getById(id);
    if (!existingBook) {
      throw new NotFoundException();
    }

    return this.db.book.update({
      where: { id },
      data: book,
    });
  }

  async deleteById(id: number): Promise<Book> {
    const book = await this.getById(id);
    if (!book) {
      throw new NotFoundException();
    }

    return this.db.book.delete({
      where: {
        id,
      },
    });
  }

  async getAll(): Promise<Array<Book>> {
    return this.db.book.findMany();
  }

  async getByName(name: string): Promise<Book | null> {
    return this.db.book.findFirst({
      where: {
        name,
      },
    });
  }

  async getById(id: number): Promise<Book | null> {
    return this.db.book.findFirst({
      where: {
        id,
      },
    });
  }
}

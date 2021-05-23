import { DatabaseService } from '@modules/database/database.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from '@prisma/client';

import { BookDto } from './dto/Book.dto';
import { NewBookDto } from './dto/newbook.dto';

@Injectable()
export class BooksService {
  constructor(private db: DatabaseService) {}

  async create(book: NewBookDto): Promise<Book> {
    return this.db.book.create({
      data: book,
    });
  }

  async update(book: BookDto): Promise<Book> {
    const existingBook = await this.getById(book.id);
    if (!existingBook) {
      throw new NotFoundException();
    }

    return this.db.book.update({
      where: { id: book.id },
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

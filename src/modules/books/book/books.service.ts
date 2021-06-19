import { DatabaseService } from '@database/database.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from '@prisma/client';

import { AuthorsService } from '../author/authors.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    private db: DatabaseService,
    private authorsService: AuthorsService,
  ) {}

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

  async getById(id: number): Promise<Book | null> {
    return this.db.book.findFirst({
      where: {
        id,
      },
    });
  }

  async getByAuthorId(id: number): Promise<Array<Book>> {
    const author = await this.authorsService.getById(id);
    if (!author) {
      throw new NotFoundException();
    }

    return this.db.book.findMany({
      where: {
        idAuthor: id,
      },
    });
  }

  async getBy(idAuthors: Array<number>): Promise<Array<Book>> {
    return this.db.book.findMany({
      where: {
        idAuthor: { in: idAuthors },
      },
    });
  }
}

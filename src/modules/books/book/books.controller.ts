import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ApiRoute } from '@decorators/api-route';
import { ForeignKeyExceptionFilter } from '@filters/fk-exception.filter';
import { JwtAuthGuard } from '@modules/users/auth/guards/jwt.auth-guard';
import { NumberArrayPipe } from '@pipes/number-array.pipe';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { PersistedBookDto } from './dto/persisted-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@UseGuards(JwtAuthGuard)
@Controller('books')
@ApiTags('crud-books')
@ApiBearerAuth()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiRoute({
    summary: 'Retrieves books',
    description: 'Gets all books',
    ok: { type: [PersistedBookDto], description: 'The books' },
  })
  async getBooks(): Promise<Array<PersistedBookDto>> {
    return this.booksService.getAll();
  }

  @Get('by')
  @ApiRoute({
    summary: 'Retrieves books written by one or several authors',
    description:
      'Books can be filtered by a list of authors, using either one query param (idAuthors=1,2,3) or several (idAuthors=1&idAuthors=2)',
    ok: { type: [PersistedBookDto], description: 'The authors books' },
    badRequest: {},
  })
  async getBooksBy(
    @Query(
      'idAuthors',
      new ParseArrayPipe({
        items: Number,
        separator: ',',
      }),
      new NumberArrayPipe(),
    )
    idAuthors: number[],
  ): Promise<Array<PersistedBookDto>> {
    return this.booksService.getBy(idAuthors);
  }

  @Post()
  @UseFilters(ForeignKeyExceptionFilter)
  @ApiRoute({
    summary: 'Create a book',
    description: 'Creates a new book',
    created: { type: PersistedBookDto, description: 'The created book' },
    badRequest: {},
  })
  async createBook(@Body() newBook: CreateBookDto): Promise<PersistedBookDto> {
    return this.booksService.create(newBook);
  }

  @Put(':id')
  @UseFilters(ForeignKeyExceptionFilter)
  @ApiRoute({
    summary: 'Update a book',
    description: 'Modifies a book',
    ok: { type: PersistedBookDto, description: 'The modified book' },
    notFound: { description: "The requested book wasn't found" },
    badRequest: {},
  })
  async updateBook(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() book: UpdateBookDto,
  ): Promise<PersistedBookDto> {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  @ApiRoute({
    summary: 'Delete a book',
    description: 'Removes a book',
    ok: { type: PersistedBookDto, description: 'The deleted book' },
    notFound: { description: "The requested book wasn't found" },
  })
  async deleteBook(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<PersistedBookDto> {
    return this.booksService.deleteById(id);
  }
}

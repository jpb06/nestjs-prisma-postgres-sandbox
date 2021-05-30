import { ApiRoute } from '@decorators/api-route';
import { ForeignKeyExceptionFilter } from '@filters/fk-exception.filter';
import { JwtAuthGuard } from '@modules/users/auth/guards/jwt.auth-guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { PersistedBookDto } from './dto/persisted-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@UseGuards(JwtAuthGuard)
@Controller('books')
@ApiTags('Books')
@ApiBearerAuth()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiRoute({
    summary: 'Get all books',
    description: 'Retrieves all the books',
    ok: { type: [PersistedBookDto], description: 'The available books' },
  })
  async getBooks(): Promise<Array<PersistedBookDto>> {
    return this.booksService.getAll();
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

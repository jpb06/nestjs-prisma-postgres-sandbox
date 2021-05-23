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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiResponseDto } from '@owntypes/dto/api-response.dto';
import { BadRequestDto } from '@owntypes/dto/bad-request-response.dto';

import { BooksService } from './books.service';
import { BookDto } from './dto/Book.dto';
import { NewBookDto } from './dto/newbook.dto';

@UseGuards(JwtAuthGuard)
@Controller('books')
@ApiTags('Books')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Missing, invalid or expired token',
  type: ApiResponseDto,
})
@ApiInternalServerErrorResponse({
  description: 'Internal server error',
  type: ApiResponseDto,
})
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all books',
    description: 'Retrieves all the books',
  })
  @ApiOkResponse({
    description: 'The available books',
    type: [BookDto],
  })
  async getBooks(): Promise<Array<BookDto>> {
    return this.booksService.getAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a book',
    description: 'Creates a new book',
  })
  @ApiCreatedResponse({
    description: 'The created book',
    type: BookDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: BadRequestDto,
  })
  async createBook(@Body() newBook: NewBookDto): Promise<BookDto> {
    return this.booksService.create(newBook);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a book',
    description: 'Modifies a book',
  })
  @ApiOkResponse({
    description: 'The modified book',
    type: BookDto,
  })
  @ApiNotFoundResponse({
    description: "The requested book wasn't found",
    type: ApiResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: BadRequestDto,
  })
  async updateBook(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() book: BookDto,
  ): Promise<BookDto> {
    return this.booksService.update(book);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a book',
    description: 'Removes a book',
  })
  @ApiOkResponse({
    description: 'The deleted book',
    type: BookDto,
  })
  @ApiNotFoundResponse({
    description: "The requested book wasn't found",
    type: ApiResponseDto,
  })
  async deleteBook(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<BookDto> {
    return this.booksService.deleteById(id);
  }
}

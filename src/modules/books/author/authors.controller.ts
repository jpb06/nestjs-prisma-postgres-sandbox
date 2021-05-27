import { ApiRoute } from '@decorators/api-route';
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { PersistedAuthorDto } from './dto/persisted-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@UseGuards(JwtAuthGuard)
@Controller('authors')
@ApiTags('authors')
@ApiBearerAuth()
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @ApiRoute({
    summary: 'Get all authors',
    description: 'Retrieves all the authors',
    ok: { type: [PersistedAuthorDto], description: 'The books authors' },
  })
  async getAuthors(): Promise<Array<PersistedAuthorDto>> {
    return this.authorsService.getAll();
  }

  @Post()
  @ApiRoute({
    summary: 'Create an author',
    description: 'Creates a new book author',
    created: { type: CreateAuthorDto, description: 'The created author' },
    badRequest: {},
  })
  async createAuthor(
    @Body() newAuthor: CreateAuthorDto,
  ): Promise<PersistedAuthorDto> {
    return this.authorsService.create(newAuthor);
  }

  @Put(':id')
  @ApiRoute({
    summary: 'Update an author',
    description: 'Modifies a book author',
    ok: { type: CreateAuthorDto, description: 'The modified author' },
    notFound: { description: "The requested author wasn't found" },
    badRequest: {},
  })
  async updateAuthor(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() book: UpdateAuthorDto,
  ): Promise<CreateAuthorDto> {
    return this.authorsService.update(id, book);
  }

  @Delete(':id')
  @ApiRoute({
    summary: 'Delete an author',
    description: 'Removes an author',
    ok: { type: PersistedAuthorDto, description: 'The deleted author' },
    notFound: { description: "The requested author wasn't found" },
  })
  async deleteAuthor(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<PersistedAuthorDto> {
    return this.authorsService.deleteById(id);
  }
}

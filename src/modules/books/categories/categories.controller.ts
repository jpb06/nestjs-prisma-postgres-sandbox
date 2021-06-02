import { ApiRoute } from '@decorators/api-route';
import { ForeignKeyDeletionExceptionFilter } from '@filters/fk-deletion-exception.filter';
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

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PersistedCategoryDto } from './dto/persisted-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@UseGuards(JwtAuthGuard)
@Controller('categories')
@ApiTags('crud-categories')
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiRoute({
    summary: 'Get all categories',
    description: 'Retrieves all the books categories',
    ok: {
      type: [PersistedCategoryDto],
      description: 'The available categories',
    },
  })
  async getCategories(): Promise<Array<PersistedCategoryDto>> {
    return this.categoriesService.getAll();
  }

  @Post()
  @ApiRoute({
    summary: 'Create a category',
    description: 'Creates a new book category',
    created: {
      type: PersistedCategoryDto,
      description: 'The created category',
    },
    badRequest: {},
  })
  async createCategory(
    @Body() newBook: CreateCategoryDto,
  ): Promise<PersistedCategoryDto> {
    return this.categoriesService.create(newBook);
  }

  @Put(':id')
  @ApiRoute({
    summary: 'Update a category',
    description: 'Modifies a book category',
    ok: { type: PersistedCategoryDto, description: 'The modified category' },
    notFound: { description: "The requested category wasn't found" },
    badRequest: {},
  })
  async updateCategory(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() book: UpdateCategoryDto,
  ): Promise<PersistedCategoryDto> {
    return this.categoriesService.update(id, book);
  }

  @Delete(':id')
  @UseFilters(ForeignKeyDeletionExceptionFilter)
  @ApiRoute({
    summary: 'Delete a category',
    description: 'Removes a book category',
    ok: { type: PersistedCategoryDto, description: 'The deleted category' },
    notFound: { description: "The requested category wasn't found" },
  })
  async deleteCategory(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<PersistedCategoryDto> {
    return this.categoriesService.deleteById(id);
  }
}

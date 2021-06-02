import { Module } from '@nestjs/common';

import { AuthorsModule } from './books/author/authors.module';
import { BooksModule } from './books/book/books.module';
import { CategoriesModule } from './books/categories/categories.module';
import { UsersModule } from './users/user/users.module';

@Module({
  imports: [UsersModule, BooksModule, AuthorsModule, CategoriesModule],
})
export class AppModule {}

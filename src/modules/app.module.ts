import { Module } from '@nestjs/common';

import { BooksModule } from './books/book/books.module';
import { UsersModule } from './users/user/users.module';

@Module({
  imports: [UsersModule, BooksModule],
})
export class AppModule {}

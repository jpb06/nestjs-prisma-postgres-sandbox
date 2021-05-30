import { DatabaseModule } from '@database/database.module';
import { AuthModule } from '@modules/users/auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';

import { AuthorsModule } from '../author/authors.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [DatabaseModule, AuthModule, forwardRef(() => AuthorsModule)],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}

import { DatabaseModule } from '@database/database.module';
import { AuthModule } from '@modules/users/auth/auth.module';
import { Module } from '@nestjs/common';

import { BooksModule } from '../book/books.module';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
  imports: [DatabaseModule, AuthModule, BooksModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}

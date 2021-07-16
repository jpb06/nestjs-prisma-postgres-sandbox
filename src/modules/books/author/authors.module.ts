import { forwardRef, Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';
import { AuthModule } from '@modules/users/auth/auth.module';

import { BooksModule } from '../book/books.module';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
  imports: [DatabaseModule, AuthModule, forwardRef(() => BooksModule)],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}

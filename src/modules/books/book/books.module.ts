import { DatabaseModule } from '@database/database.module';
import { AuthModule } from '@modules/users/auth/auth.module';
import { Module } from '@nestjs/common';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}

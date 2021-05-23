import { DatabaseModule } from '@modules/database/database.module';
import { Module } from '@nestjs/common';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}

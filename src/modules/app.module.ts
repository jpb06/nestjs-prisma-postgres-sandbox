import { Module } from '@nestjs/common';

import { UsersModule } from './users/user/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}

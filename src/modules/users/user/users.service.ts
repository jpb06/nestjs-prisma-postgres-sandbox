import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { DatabaseService } from '../../database/database.service';

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  async findOne(email: string): Promise<User | null> {
    const user = await this.db.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
}

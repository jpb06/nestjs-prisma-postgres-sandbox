import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<Array<string>> {
    const users = await this.prisma.user.findMany({
      select: {
        firstName: true,
        lastName: true,
      },
    });

    return users.map((el) => `${el.firstName} ${el.lastName}`);
  }
}

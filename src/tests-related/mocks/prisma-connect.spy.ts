import { PrismaClient } from '@prisma/client';

export const mockedPrismaConnect = () =>
  jest
    .spyOn(PrismaClient.prototype, '$connect')
    .mockImplementationOnce(async () => {
      return;
    });

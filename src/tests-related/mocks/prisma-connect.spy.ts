import { PrismaClient } from '@prisma/client';

export const mockedPrismaConnect = (): jest.SpyInstance<unknown, unknown[]> =>
  jest
    .spyOn(PrismaClient.prototype, '$connect')
    .mockImplementationOnce(async () => {
      return;
    });

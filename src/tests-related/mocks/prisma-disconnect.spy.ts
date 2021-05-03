import { PrismaClient } from '@prisma/client';

export const mockedPrismaDisconnect = () =>
  jest
    .spyOn(PrismaClient.prototype, '$disconnect')
    .mockImplementationOnce(async () => {
      return;
    });

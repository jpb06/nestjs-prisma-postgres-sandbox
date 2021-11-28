import { PrismaClient } from '@prisma/client';

export const mockedPrismaConnect = (): jest.SpyInstance<unknown, unknown[]> =>
  jest
    .spyOn(PrismaClient.prototype, '$connect')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .mockImplementationOnce(async () => {});

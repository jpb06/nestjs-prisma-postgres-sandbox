import { PrismaClient } from '@prisma/client';

export const mockedPrismaDisconnect = (): jest.SpyInstance<
  unknown,
  unknown[]
> =>
  jest
    .spyOn(PrismaClient.prototype, '$disconnect')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .mockImplementationOnce(async () => {});

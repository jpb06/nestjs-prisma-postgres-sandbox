import { Test, TestingModule } from '@nestjs/testing';

import { mockedPrismaConnect } from '@tests/spies/prisma-connect.spy';
import { mockedPrismaDisconnect } from '@tests/spies/prisma-disconnect.spy';

import { DatabaseService } from './database.service';

describe('Database service', () => {
  let service: DatabaseService;
  let mockedConnect: jest.SpyInstance<unknown, unknown[]>;
  let mockedDisconnect: jest.SpyInstance<unknown, unknown[]>;

  beforeEach(async () => {
    mockedConnect = mockedPrismaConnect();
    mockedDisconnect = mockedPrismaDisconnect();

    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  afterAll(async () => {
    mockedConnect.mockRestore();
    mockedDisconnect.mockRestore();
  });

  it('should start and stop', async () => {
    expect(service).toBeDefined();
    await service.onModuleInit();
    await service.onModuleDestroy();

    expect(mockedConnect).toHaveBeenCalledTimes(1);
    expect(mockedDisconnect).toHaveBeenCalledTimes(1);
  });
});

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { mockedPrismaConnect } from '@tests/spies/prisma-connect.spy';
import { mockedPrismaDisconnect } from '@tests/spies/prisma-disconnect.spy';

import { bootstrap } from './bootstrap';

describe('bootstrap function', () => {
  let app: INestApplication;
  let mockedConnect: jest.SpyInstance<unknown, unknown[]>;
  let mockedDisconnect: jest.SpyInstance<unknown, unknown[]>;

  beforeEach(() => {
    mockedConnect = mockedPrismaConnect();
    mockedDisconnect = mockedPrismaDisconnect();
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  afterAll(async () => {
    mockedConnect.mockRestore();
    mockedDisconnect.mockRestore();
  });

  it('should create our nest application', async () => {
    const createSpy = jest.spyOn(NestFactory, 'create');
    Logger.overrideLogger(['error']);

    app = await bootstrap();
    expect(createSpy).toHaveBeenCalledTimes(1);

    createSpy.mockRestore();
  });
});

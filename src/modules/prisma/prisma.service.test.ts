import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../app.module';
import { PrismaService } from './prisma.service';

describe('Prisma service', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    prismaService = app.get(PrismaService);
  });

  afterEach(async () => {
    await prismaService.$disconnect();
  });

  it('should call connect on init', async () => {
    const connectSpy = jest.spyOn(prismaService, '$connect');
    await app.init();

    expect(connectSpy).toHaveBeenCalledTimes(1);
  });

  it('should call disconnect on destroy', async () => {
    const disconnectSpy = jest.spyOn(prismaService, '$disconnect');
    await app.close();

    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });
});

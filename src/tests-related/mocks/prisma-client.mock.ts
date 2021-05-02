import { mockDeep } from 'jest-mock-extended';

import { PrismaClient as OriginaPrismaClient } from '@prisma/client';

const mockPrisma = mockDeep<OriginaPrismaClient>();

export const MockedPrismaClient = () => mockPrisma;

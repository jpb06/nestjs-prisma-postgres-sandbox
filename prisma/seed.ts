import * as bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@cool.org' },
    update: {},
    create: {
      email: `alice@cool.org`,
      firstName: 'Alice',
      lastName: 'Hartmann',
      password: await bcrypt.hash('alice', 11),
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@cool.org' },
    update: {},
    create: {
      email: `bob@cool.org`,
      firstName: 'Bob',
      lastName: 'Cool',
      password: await bcrypt.hash('bob', 11),
    },
  });
  console.log({ alice, bob });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

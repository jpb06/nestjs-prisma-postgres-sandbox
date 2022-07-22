import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const seed = async (): Promise<void> => {
  await prisma.user.upsert({
    where: { email: 'alice@cool.org' },
    update: {},
    create: {
      email: `alice@cool.org`,
      firstName: 'Alice',
      lastName: 'Hartmann',
      password: await bcrypt.hash('alice', 11),
    },
  });

  await prisma.user.upsert({
    where: { email: 'bob@cool.org' },
    update: {},
    create: {
      email: `bob@cool.org`,
      firstName: 'Bob',
      lastName: 'Cool',
      password: await bcrypt.hash('bob', 11),
    },
  });

  await prisma.author.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Dan Simmons',
    },
  });
  await prisma.author.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Alexandre Dumas',
    },
  });

  await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Science-fiction',
    },
  });
  await prisma.category.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Adventure',
    },
  });

  await prisma.book.upsert({
    where: { id: 1 },
    update: {},
    create: {
      idAuthor: 1,
      idCategory: 1,
      name: 'Hyperion',
      publicationDate: 1989,
    },
  });
  await prisma.book.upsert({
    where: { id: 2 },
    update: {},
    create: {
      idAuthor: 2,
      idCategory: 2,
      name: 'The three musketeers',
      publicationDate: 1844,
    },
  });
  await prisma.book.upsert({
    where: { id: 3 },
    update: {},
    create: {
      idAuthor: 1,
      idCategory: 1,
      name: 'Ilium',
      publicationDate: 2004,
    },
  });

  // eslint-disable-next-line no-console
  console.log('Database seeded');
  process.exit(0);
};
void seed();

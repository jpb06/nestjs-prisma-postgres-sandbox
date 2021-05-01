export const mockPrismaService = () => {
  const findManyMock = jest.fn();

  const PrismaServiceMock = {
    user: {
      findMany: findManyMock,
    },
  };

  return { PrismaServiceMock, findManyMock };
};

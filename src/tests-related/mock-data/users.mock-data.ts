import { Role } from '@prisma/client';

export const mockedUser = {
  email: 'yolo@cool.org',
  firstName: 'yolo',
  lastName: 'yola',
  role: Role.USER,
};

export const mockedUsers = [
  {
    ...mockedUser,
    id: 1,
    createdAt: new Date(),
  },
];

export const loggedUserJwtPayload = {
  ...mockedUser,
  sub: 1,
};

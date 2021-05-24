import { Role } from '@prisma/client';

export const mockedUser = {
  email: 'yolo@cool.org',
  firstName: 'yolo',
  lastName: 'yola',
  role: Role.USER,
};

export const loggedUser = {
  ...mockedUser,
  id: 1,
  createdAt: new Date(),
  token: 'cool',
};

export const loggedUserJwtPayload = {
  ...mockedUser,
  sub: 1,
};

import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import { mockDeep } from 'jest-mock-extended';

import { mockedUser } from '@tests/mock-data/users.mock-data';

import { AuthService } from './auth.service';
import { UsersService } from '../user/users.service';

describe('AuthService', () => {
  let service: AuthService;
  const jwtServiceMock = mockDeep<JwtService>();
  const usersServiceMock = mockDeep<UsersService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('validateUser function', () => {
    it('should return null when user is not found', async () => {
      usersServiceMock.findOne.mockResolvedValueOnce(null);

      const result = await service.validateUser('cool@bro.com', 'yolo');

      expect(result).toBeNull();
    });

    it('should return null when password is invalid', async () => {
      const hashedPassword = await bcrypt.hash('pwd', 11);
      usersServiceMock.findOne.mockResolvedValueOnce({
        ...mockedUser,
        id: 1,
        createdAt: new Date(),
        password: hashedPassword,
      });

      const result = await service.validateUser('cool@bro.com', 'yolo');

      expect(result).toBeNull();
    });

    it('should return the user', async () => {
      const password = 'pwd';
      const hashedPassword = await bcrypt.hash(password, 11);
      const user = {
        ...mockedUser,
        id: 1,
        createdAt: new Date(),
        password: hashedPassword,
      };

      usersServiceMock.findOne.mockResolvedValueOnce(user);

      const result = await service.validateUser('cool@bro.com', password);

      expect(result).toStrictEqual(user);
    });
  });
});

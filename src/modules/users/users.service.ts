import { Injectable } from '@nestjs/common';
import { mockUsers } from '../../dal/users.mock.data';

@Injectable()
export class UsersService {
  getUsers(): Array<string> {
    return mockUsers;
  }
}

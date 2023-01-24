import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Request as ExpressRequest } from 'express';

import { ApiRoute } from '@decorators/api-route';

import { LoggedUserDto } from './dto/logged-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';
import { JwtPayloadDto } from '../auth/dto/jwt.payload.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth-guard';
import { LocalAuthGuard } from '../auth/guards/local.auth-guard';

@Controller('users')
@ApiTags('auth-users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ description: 'The user credentials', type: LoginDto })
  @ApiRoute({
    summary: 'Login route',
    description: 'The login route',
    created: { type: LoggedUserDto, description: 'Authentication succeeded' },
  })
  async login(
    @Request() req: ExpressRequest & { user: User },
  ): Promise<LoggedUserDto> {
    return this.authService.getLoggedUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiRoute({
    summary: 'Logged user profile',
    description:
      'Retrieves the logged user profile from the jwt bearer token provided',
    ok: { description: 'Logged user profile', type: JwtPayloadDto },
  })
  getProfile(
    @Request() req: ExpressRequest & { user: JwtPayloadDto },
  ): JwtPayloadDto {
    return req.user;
  }
}

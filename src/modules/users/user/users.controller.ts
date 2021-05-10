import { Request as ExpressRequest } from 'express';

import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiResponseDto } from '@owntypes/dto/api-response.dto';
import { User } from '@prisma/client';

import { AuthService } from '../auth/auth.service';
import { JwtPayloadDto } from '../auth/dto/jwt.payload.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth-guard';
import { LocalAuthGuard } from '../auth/guards/local.auth-guard';
import { LoggedUserDto } from './dto/logged-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('user')
@ApiTags('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Login route',
    description: 'The login route',
  })
  @ApiBody({ description: 'The user credentials', type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'Authentication succeeded',
    type: LoggedUserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication failure',
    type: ApiResponseDto,
  })
  async login(
    @Request() req: ExpressRequest & { user: User },
  ): Promise<LoggedUserDto> {
    return this.authService.getLoggedUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logged user profile',
    description: 'Retrieves the logged user profile',
  })
  @ApiResponse({
    status: 200,
    description: 'Logged user profile',
    type: JwtPayloadDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid/expired token',
    type: ApiResponseDto,
  })
  getProfile(
    @Request() req: ExpressRequest & { user: JwtPayloadDto },
  ): JwtPayloadDto {
    return req.user;
  }
}

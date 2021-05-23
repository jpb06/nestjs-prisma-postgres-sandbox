import { Request as ExpressRequest } from 'express';

import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
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
@ApiTags('Users')
@ApiUnauthorizedResponse({
  description: 'Authentication failure',
  type: ApiResponseDto,
})
@ApiInternalServerErrorResponse({
  description: 'Internal server error',
  type: ApiResponseDto,
})
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Login route',
    description: 'The login route',
  })
  @ApiBody({ description: 'The user credentials', type: LoginDto })
  @ApiCreatedResponse({
    description: 'Authentication succeeded',
    type: LoggedUserDto,
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
    description:
      'Retrieves the logged user profile from the jwt bearer token provided',
  })
  @ApiOkResponse({
    description: 'Logged user profile',
    type: JwtPayloadDto,
  })
  getProfile(
    @Request() req: ExpressRequest & { user: JwtPayloadDto },
  ): JwtPayloadDto {
    return req.user;
  }
}

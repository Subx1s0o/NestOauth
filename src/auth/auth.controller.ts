import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GoogleProfile, LinkedInProfile } from 'types';
import { AuthService } from './auth.service';
import { AuthResponse } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async authWithGoogle() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: Request & { user: GoogleProfile },
  ): Promise<AuthResponse> {
    return await this.authService.verifyAndOAuth(req.user);
  }

  @Get('linkedin')
  @UseGuards(AuthGuard('linkedin'))
  async authWithLinkedIn() {}

  @Get('linkedin/callback')
  @UseGuards(AuthGuard('linkedin'))
  async linkedInAuthRedirect(
    @Req() req: Request & { user: LinkedInProfile },
  ): Promise<AuthResponse> {
    return await this.authService.verifyAndOAuth(req.user);
  }

  @Post('local/signup')
  async Signup() {}

  @Post('local/signin')
  async Signin() {}

  @Post('local/logout')
  async Logout() {}

  @Post('local/refresh')
  async Refresh() {}
}

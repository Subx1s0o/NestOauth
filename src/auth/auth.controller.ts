import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { GoogleProfile, LinkedInProfile } from 'types';
import { AuthService } from './auth.service';

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
    @Res() res: Response,
  ) {
    const user = await this.authService.verifyAndOAuth(req.user);

    res.cookie('accessToken', user.accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 20,
    });

    res.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.redirect('http://localhost:3000');
  }

  @Get('linkedin')
  @UseGuards(AuthGuard('linkedin'))
  async authWithLinkedIn() {}

  @Get('linkedin/callback')
  @UseGuards(AuthGuard('linkedin'))
  async linkedInAuthRedirect(
    @Req() req: Request & { user: LinkedInProfile },
    @Res() res: Response,
  ) {
    const user = await this.authService.verifyAndOAuth(req.user);

    res.cookie('accessToken', user.accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 20,
    });

    res.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.redirect('http://localhost:3000');
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

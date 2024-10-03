import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
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
    @Req() req: Request & { user: any },
    @Res() res: Response,
  ) {
    const user = await this.authService.verifyAndOAuth(req.user);
    return res.json(user);
  }

  @Get('linkedin')
  @UseGuards(AuthGuard('linkedin'))
  async authWithLinkedIn() {}

  @Get('linkedin/callback')
  @UseGuards(AuthGuard('linkedin'))
  async linkedInAuthRedirect(
    @Req() req: Request & { user: any },
    @Res() res: Response,
  ) {
    const user = await this.authService.verifyAndOAuth(req.user);
    return res.json(user);
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

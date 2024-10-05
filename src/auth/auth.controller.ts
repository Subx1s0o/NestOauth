import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { GoogleProfile, LinkedInProfile } from 'types';
import { AuthService } from './auth.service';
import { LoginUser, RegisterUser } from './dto';
import { AuthResponse, RefreshToken, Tokens } from './types';

@Controller('auth')
export class AuthController {
  logger: Logger;
  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name);
  }

  private async RedirectWithCookie(
    accessToken: string,
    refreshToken: string,
    res: Response,
  ) {
    this.logger.log('Setting cookies: ', accessToken, refreshToken); // Логування значень
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 24 * 7,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.redirect(`${process.env.FRONT_URL}`); // Використовуйте HTTPS
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async authWithGoogle() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: Request & { user: GoogleProfile },
    @Res() res: Response,
  ) {
    try {
      const { accessToken, refreshToken } = await this.authService.GoogleAuth(
        req.user,
      );
      await this.RedirectWithCookie(accessToken, refreshToken, res);
    } catch (error) {
      this.logger.error('Error while Google Authorization: ', error);
      throw new InternalServerErrorException(
        'Something Went Wrong, try again later.',
      );
    }
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
    try {
      const { accessToken, refreshToken } = await this.authService.LinkedinAuth(
        req.user,
      );
      await this.RedirectWithCookie(accessToken, refreshToken, res);
    } catch (error) {
      this.logger.error('Error while Linkedin Authorization: ', error);
      throw new InternalServerErrorException(
        'Something Went Wrong, try again later.',
      );
    }
  }

  @Post('local/signup')
  async Signup(@Body() data: RegisterUser): Promise<AuthResponse> {
    return await this.authService.signupLocal(data);
  }

  @Post('local/signin')
  async Signin(@Body() data: LoginUser): Promise<AuthResponse> {
    return await this.authService.signinLocal(data);
  }

  @Post('refresh')
  async Refresh(@Body() token: RefreshToken): Promise<Tokens> {
    return await this.authService.refreshTokens(token);
  }

  @Post('logged')
  async isLogged(@Body() token: RefreshToken): Promise<{ isLogged: boolean }> {
    return await this.authService.isLogged(token);
  }
}

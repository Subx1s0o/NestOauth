import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async authWithGoogle(@Req() req: Request) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(
    @Req() req: Request & { user: any },
    @Res() res: Response,
  ) {
    const user = req.user;

    console.log(user);
    return true;
  }

  @Get('linkedin')
  @UseGuards(AuthGuard('linkedin'))
  async authWithLinkedIn(@Req() req: Request) {}

  @Get('linkedin/callback')
  @UseGuards(AuthGuard('linkedin'))
  async linkedInAuthRedirect(
    @Req() req: Request & { user: any },
    @Res() res: Response,
  ) {
    const user = req.user;

    console.log(user);
    return true;
  }
}

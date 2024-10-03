import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import JwtGuard from 'src/auth/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  async getME(@Req() req: Request & { userId: string }) {
    console.log(req.userId);
  }
}

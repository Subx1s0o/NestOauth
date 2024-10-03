import { PrismaService } from '@libs/prisma/prisma.service,';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly JwtService: JwtService,
  ) {}

  generateTokens(user_data) {
    const accessToken = this.JwtService.sign(
      {
        sub: user_data.id,
        email: user_data.email,
      },
      { expiresIn: '20m' },
    );
    const refreshToken = this.JwtService.sign(
      {
        sub: user_data.id,
        email: user_data.email,
      },
      { expiresIn: '7d' },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyAndOAuth(data) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      const userData = {
        email: data.email,
        name: data.displayName,
        avatar:
          Array.isArray(data.photos) && data.photos.length > 0
            ? data.photos[0].value
            : '',
        isVerified: true,
      };
      const createdUser = await this.prisma.user.create({ data: userData });

      const tokens = this.generateTokens(createdUser);

      return {
        avatar: createdUser.avatar,
        name: createdUser.name,
        email: createdUser.email,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt,
      };
    }

    const tokens = this.generateTokens(user);

    return {
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async SignupLocal() {}
  async SigninLocal() {}
  async LogoutLocal() {}
  async RefreshTokens() {}
}

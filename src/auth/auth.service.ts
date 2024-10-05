import { PrismaService } from '@libs/prisma/prisma.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { GoogleProfile, LinkedInProfile } from 'types';
import { LoginUser, RegisterUser } from './dto';
import { AuthResponse, RefreshToken, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly JwtService: JwtService,
  ) {}

  private generateTokens(user_data: User): Tokens {
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

  async GoogleAuth(user_data: GoogleProfile): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: user_data.email },
    });

    if (!user) {
      const userData = {
        email: user_data.email,
        name: user_data.given_name,
        surname: user_data.family_name || null,
        avatar: user_data.picture || '',
      };
      const createdUser = await this.prisma.user.create({ data: userData });
      const tokens = this.generateTokens(createdUser);

      return {
        data: {
          ...createdUser,
        },
        ...tokens,
      };
    }

    const tokens = this.generateTokens(user);

    return {
      data: {
        ...user,
      },
      ...tokens,
    };
  }

  async LinkedinAuth(user_data: LinkedInProfile): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: user_data.email },
    });

    if (!user) {
      const userData = {
        email: user_data.email,
        name: user_data.givenName,
        surname: user_data.familyName || null,
        avatar: user_data.picture || '',
      };
      const createdUser = await this.prisma.user.create({ data: userData });
      const tokens = this.generateTokens(createdUser);

      return {
        data: {
          ...createdUser,
        },
        ...tokens,
      };
    }

    const tokens = this.generateTokens(user);

    return {
      data: {
        ...user,
      },
      ...tokens,
    };
  }

  async signupLocal(auth_data: RegisterUser): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: auth_data.email },
    });

    if (user) {
      throw new ConflictException('The User already exists');
    }

    const createdUser = await this.prisma.user.create({ data: auth_data });
    const tokens = this.generateTokens(createdUser);

    return {
      data: {
        ...createdUser,
      },
      ...tokens,
    };
  }

  async signinLocal(auth_data: LoginUser): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: auth_data.email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const tokens = this.generateTokens(user);

    return {
      data: {
        ...user,
      },
      ...tokens,
    };
  }

  async logoutLocal() {}

  async refreshTokens({ refreshToken }: RefreshToken) {
    try {
      const payload = await this.JwtService.verify(refreshToken);

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) throw new BadRequestException('User not found');
      const tokens = this.generateTokens(user);

      return tokens;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Invalid refresh token');
    }
  }

  async isLogged({ refreshToken }: RefreshToken) {
    try {
      const payload = await this.JwtService.verify(refreshToken);
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });
      if (!user) throw new BadRequestException('User not found');
      return {
        isLogged: true,
      };
    } catch (e) {
      return {
        isLogged: false,
      };
    }
  }
}

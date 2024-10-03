import { PassportModule } from '@libs/passport/passport.module';
import { PrismaService } from '@libs/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtGuard],
  exports: [JwtGuard, JwtModule],
})
export class AuthModule {}

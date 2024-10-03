import { Module } from '@nestjs/common';
import { ConfigModule } from './src/config/config.module';
import { PassportModule } from './src/passport/passport.module';
import { PrismaService } from './src/prisma/prisma.service';

@Module({
  imports: [PassportModule, ConfigModule, PrismaService],
  exports: [ConfigModule, PassportModule, PrismaService],
})
export class LibsModule {}

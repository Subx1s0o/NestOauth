import { Module } from '@nestjs/common';
import { ConfigModule } from 'libs/src/config/config.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule, AuthModule, UserModule],
})
export class AppModule {}

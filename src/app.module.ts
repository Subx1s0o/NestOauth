import { Module } from '@nestjs/common';
import { ConfigModule } from 'libs/src/config/config.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule, AuthModule],
})
export class AppModule {}

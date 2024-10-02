import { Module } from '@nestjs/common';
import { ConfigModule } from './src/config/config.module';
import { PassportModule } from './src/passport/passport.module';

@Module({
  imports: [PassportModule, ConfigModule],
  exports: [ConfigModule, PassportModule],
})
export class LibsModule {}

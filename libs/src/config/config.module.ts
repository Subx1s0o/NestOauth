import { Module } from '@nestjs/common';
import { ConfigModule as BaseModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    BaseModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}

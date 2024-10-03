import { Module } from '@nestjs/common';

import GoogleStrategy from './strategies/GoogleStrategy';
import LinkedinStrategy from './strategies/LinkedInStrategy';

@Module({
  providers: [GoogleStrategy, LinkedinStrategy],
  exports: [GoogleStrategy, LinkedinStrategy],
})
export class PassportModule {}

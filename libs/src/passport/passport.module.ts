import { Module } from '@nestjs/common';
import GithubStrategy from './strategies/GithubStrategy';
import GoogleStrategy from './strategies/GoogleStrategy';
import LinkedinStrategy from './strategies/LinkedInStrategy';

@Module({
  providers: [GoogleStrategy, LinkedinStrategy, GithubStrategy],
  exports: [GoogleStrategy, LinkedinStrategy, GithubStrategy],
})
export class PassportModule {}

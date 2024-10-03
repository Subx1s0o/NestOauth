import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';
import { LinkedInProfile } from 'types';

@Injectable()
export default class LinkedinStrategy extends PassportStrategy(
  Strategy,
  'linkedin',
) {
  constructor(private readonly config: ConfigService) {
    super({
      clientID: config.get('LINKEDIN_ID'),
      clientSecret: config.get('LINKEDIN_SECRET'),
      callbackURL: config.get('LINKEDIN_REDIRECT'),
      scope: ['email', 'profile', 'openid'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: LinkedInProfile,
  ) {
    return profile;
  }
}

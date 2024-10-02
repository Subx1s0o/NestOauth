import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';

@Injectable()
export default class GithubStrategy extends PassportStrategy(
  Strategy,
  'github',
) {
  constructor(private readonly config: ConfigService) {
    super({
      clientID: config.get('GITHUB_ID'),
      clientSecret: config.get('GITHUB_SECRET'),
      callbackURL: config.get('GITHUB_REDIRECT'),
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return profile;
  }
}

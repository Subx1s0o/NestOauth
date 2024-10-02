import { Injectable } from '@nestjs/common';
import { ConfigService as Config } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: Config) {}

  get(key: string): string | undefined {
    return this.configService.get<string>(key);
  }
}

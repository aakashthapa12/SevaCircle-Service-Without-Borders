import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
  constructor(private configService: ConfigService) {}

  get(key: string): string {
    const value = this.configService.get<string>(key);
    if (value === undefined) {
      throw new Error(`Configuration key ${key} is not defined`);
    }
    return value;
  }

  getPort(): number {
    return parseInt(this.get('PORT'), 10);
  }

  getDatabaseUrl(): string {
    return this.get('DATABASE_URL');
  }

  isProduction(): boolean {
    return this.get('NODE_ENV') === 'production';
  }
}

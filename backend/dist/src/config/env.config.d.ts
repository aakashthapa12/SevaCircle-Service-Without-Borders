import { ConfigService } from '@nestjs/config';
export declare class EnvConfigService {
    private configService;
    constructor(configService: ConfigService);
    get(key: string): string;
    getPort(): number;
    getDatabaseUrl(): string;
    isProduction(): boolean;
}

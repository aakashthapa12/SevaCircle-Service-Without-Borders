import { Controller, Get } from '@nestjs/common';

interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
  database: string;
}

@Controller('api/health')
export class HealthController {
  @Get()
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      service: 'local-services-api',
      timestamp: new Date().toISOString(),
      database: 'connected',
    };
  }
}

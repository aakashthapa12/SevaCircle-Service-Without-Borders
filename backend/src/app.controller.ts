import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

interface ApiResponse {
  message: string;
  version: string;
  timestamp: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): ApiResponse {
    return {
      message: 'Local Services API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
}


import { AppService } from './app.service';
interface ApiResponse {
    message: string;
    version: string;
    timestamp: string;
}
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getRoot(): ApiResponse;
}
export {};

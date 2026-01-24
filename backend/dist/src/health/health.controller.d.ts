interface HealthResponse {
    status: string;
    service: string;
    timestamp: string;
    database: string;
}
export declare class HealthController {
    getHealth(): HealthResponse;
}
export {};

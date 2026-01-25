import { AuthService } from './auth.service';
import type { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(body: {
        email: string;
        password: string;
        name?: string;
        phone?: string;
    }): Promise<{
        id: string;
        email: string;
        name: string | null;
    }>;
    registerWorker(body: {
        email: string;
        password: string;
        name?: string;
        phone?: string;
    }): Promise<{
        id: string;
        email: string;
        name: string | null;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    profile(req: Request): Promise<{
        role: string;
        profile: {
            bookingsCount: number;
            id: string;
            phone: string | null;
            email: string;
            name: string | null;
            totalSavings: number;
            membershipStatus: string;
            favoritesCount: number;
            street: string | null;
            city: string | null;
            state: string | null;
            pincode: string | null;
            landmark: string | null;
            bookings: {
                id: string;
            }[];
        };
    } | {
        role: string;
        profile: {
            id: string;
            phone: string | null;
            email: string;
            name: string | null;
            service: string | null;
            rating: number;
            totalEarnings: number;
            completedJobs: number;
        };
    }>;
    updateProfile(req: Request, body: {
        name?: string;
        phone?: string;
        street?: string;
        city?: string;
        state?: string;
        pincode?: string;
        landmark?: string;
    }): Promise<{
        id: string;
        phone: string | null;
        email: string;
        name: string | null;
        totalSavings: number;
        membershipStatus: string;
        favoritesCount: number;
        street: string | null;
        city: string | null;
        state: string | null;
        pincode: string | null;
        landmark: string | null;
    }>;
}

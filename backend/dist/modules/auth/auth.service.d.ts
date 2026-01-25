import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    createUser(email: string, password: string, name?: string, phone?: string): Promise<{
        id: string;
        email: string;
        name: string | null;
    }>;
    createWorker(email: string, password: string, name?: string, phone?: string): Promise<{
        id: string;
        email: string;
        name: string | null;
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    getProfileFromToken(token: string): Promise<{
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
    updateUserProfile(userId: string, updates: {
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

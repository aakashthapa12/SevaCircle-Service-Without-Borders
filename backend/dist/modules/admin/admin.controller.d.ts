import { PrismaService } from '../../prisma/prisma.service';
export declare class AdminController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listUsers(): Promise<{
        id: string;
        phone: string | null;
        email: string;
        name: string | null;
        createdAt: Date;
    }[]>;
    listWorkers(): Promise<{
        id: string;
        phone: string | null;
        email: string;
        name: string | null;
        createdAt: Date;
        service: string | null;
    }[]>;
    getDashboardStats(): Promise<{
        totalUsers: number;
        totalWorkers: number;
        totalBookings: number;
        monthlyRevenue: number;
    }>;
    getTrendingServices(): Promise<{
        service: string;
        count: number;
    }[]>;
    getRecentBookings(): Promise<({
        user: {
            email: string;
            name: string | null;
        };
        worker: {
            email: string;
            name: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        service: string;
        userId: string;
        workerId: string;
        date: Date;
        timeSlot: string;
        status: string;
        totalAmount: number;
    })[]>;
    getTopWorkers(): Promise<{
        id: string;
        email: string;
        name: string | null;
        service: string | null;
        rating: number;
        totalEarnings: number;
        completedJobs: number;
    }[]>;
    getBookingsStats(): Promise<{
        totalBookings: number;
        activeBookings: number;
        completedToday: number;
        successRate: number;
    }>;
    getAllBookings(): Promise<({
        user: {
            email: string;
            name: string | null;
        };
        worker: {
            email: string;
            name: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        service: string;
        userId: string;
        workerId: string;
        date: Date;
        timeSlot: string;
        status: string;
        totalAmount: number;
    })[]>;
    getUsersStats(): Promise<{
        activeUsers: number;
        newThisMonth: number;
        premiumUsers: number;
        userSatisfaction: number;
    }>;
    getWorkersStats(): Promise<{
        totalWorkers: number;
        activeWorkers: number;
        avgRating: number;
        monthlyJobs: number;
    }>;
    getRevenueAnalytics(): Promise<{
        monthlyRevenue: {
            month: string;
            revenue: number;
        }[];
        totalRevenue: number;
    }>;
    getServiceDistribution(): Promise<{
        service: string;
        count: number;
        percentage: number;
    }[]>;
    getDetailedMetrics(): Promise<{
        avgBookingValue: number;
        avgResponseTime: number;
        retentionRate: number;
        peakHours: string;
        peakUsage: number;
        userGrowth: number;
        bookingRate: number;
        avgWorkerRating: number;
    }>;
}

import { PrismaService } from '../../prisma/prisma.service';
export declare class AdminController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listUsers(): Promise<{
        id: string;
        phone: string | null;
        name: string | null;
        email: string;
        createdAt: Date;
    }[]>;
    listWorkers(): Promise<{
        id: string;
        phone: string | null;
        name: string | null;
        email: string;
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
            name: string | null;
            email: string;
        };
        worker: {
            name: string | null;
            email: string;
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
        name: string | null;
        email: string;
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
            name: string | null;
            email: string;
        };
        worker: {
            name: string | null;
            email: string;
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

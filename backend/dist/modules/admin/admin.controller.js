"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AdminController = class AdminController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listUsers() {
        return this.prisma.user.findMany({ select: { id: true, email: true, name: true, phone: true, createdAt: true } });
    }
    async listWorkers() {
        return this.prisma.worker.findMany({ select: { id: true, email: true, name: true, phone: true, service: true, createdAt: true } });
    }
    async getDashboardStats() {
        const totalUsers = await this.prisma.user.count();
        const totalWorkers = await this.prisma.worker.count();
        const totalBookings = await this.prisma.booking.count();
        const bookings = await this.prisma.booking.findMany({
            select: { totalAmount: true }
        });
        const monthlyRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
        return {
            totalUsers,
            totalWorkers,
            totalBookings,
            monthlyRevenue
        };
    }
    async getTrendingServices() {
        const bookings = await this.prisma.booking.groupBy({
            by: ['service'],
            _count: { service: true },
            orderBy: { _count: { service: 'desc' } },
            take: 5
        });
        return bookings.map(b => ({
            service: b.service,
            count: b._count.service
        }));
    }
    async getRecentBookings() {
        const bookings = await this.prisma.booking.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { name: true, email: true } },
                worker: { select: { name: true, email: true } }
            }
        });
        return bookings;
    }
    async getTopWorkers() {
        const workers = await this.prisma.worker.findMany({
            orderBy: [
                { completedJobs: 'desc' },
                { totalEarnings: 'desc' }
            ],
            take: 10,
            select: {
                id: true,
                name: true,
                email: true,
                service: true,
                rating: true,
                completedJobs: true,
                totalEarnings: true
            }
        });
        return workers;
    }
    async getBookingsStats() {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const totalBookings = await this.prisma.booking.count();
        const activeBookings = await this.prisma.booking.count({
            where: { status: 'in-progress' }
        });
        const completedToday = await this.prisma.booking.count({
            where: {
                status: 'completed',
                createdAt: { gte: todayStart }
            }
        });
        const totalCompletedBookings = await this.prisma.booking.count({
            where: { status: 'completed' }
        });
        const successRate = totalBookings > 0 ? (totalCompletedBookings / totalBookings) * 100 : 0;
        return {
            totalBookings,
            activeBookings,
            completedToday,
            successRate: parseFloat(successRate.toFixed(1))
        };
    }
    async getAllBookings() {
        const bookings = await this.prisma.booking.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { name: true, email: true } },
                worker: { select: { name: true, email: true } }
            }
        });
        return bookings;
    }
    async getUsersStats() {
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const activeUsers = await this.prisma.user.count();
        const newThisMonth = await this.prisma.user.count({
            where: { createdAt: { gte: monthStart } }
        });
        const premiumUsers = await this.prisma.user.count({
            where: { membershipStatus: 'Premium' }
        });
        const completedBookings = await this.prisma.booking.findMany({
            where: { status: 'completed' },
            include: { worker: { select: { rating: true } } }
        });
        const totalRating = completedBookings.reduce((sum, b) => sum + (b.worker.rating || 0), 0);
        const userSatisfaction = completedBookings.length > 0 ? totalRating / completedBookings.length : 0;
        return {
            activeUsers,
            newThisMonth,
            premiumUsers,
            userSatisfaction: parseFloat(userSatisfaction.toFixed(1))
        };
    }
    async getWorkersStats() {
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const totalWorkers = await this.prisma.worker.count();
        const activeWorkers = await this.prisma.worker.count({
            where: { completedJobs: { gt: 0 } }
        });
        const workers = await this.prisma.worker.findMany({
            select: { rating: true, completedJobs: true }
        });
        const totalRating = workers.reduce((sum, w) => sum + w.rating, 0);
        const avgRating = workers.length > 0 ? totalRating / workers.length : 0;
        const monthlyJobs = await this.prisma.booking.count({
            where: {
                createdAt: { gte: monthStart },
                status: { in: ['completed', 'in-progress'] }
            }
        });
        return {
            totalWorkers,
            activeWorkers,
            avgRating: parseFloat(avgRating.toFixed(1)),
            monthlyJobs
        };
    }
    async getRevenueAnalytics() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const monthlyRevenue = [];
        for (let i = 11; i >= 0; i--) {
            const month = new Date(currentYear, currentMonth - i, 1);
            const nextMonth = new Date(currentYear, currentMonth - i + 1, 1);
            const bookings = await this.prisma.booking.findMany({
                where: {
                    createdAt: { gte: month, lt: nextMonth },
                    status: 'completed'
                },
                select: { totalAmount: true }
            });
            const revenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
            monthlyRevenue.push({
                month: month.toLocaleString('default', { month: 'short' }),
                revenue
            });
        }
        const totalRevenue = await this.prisma.booking.aggregate({
            where: {
                status: 'completed',
                createdAt: { gte: new Date(currentYear, currentMonth, 1) }
            },
            _sum: { totalAmount: true }
        });
        return {
            monthlyRevenue,
            totalRevenue: totalRevenue._sum.totalAmount || 0
        };
    }
    async getServiceDistribution() {
        const services = await this.prisma.booking.groupBy({
            by: ['service'],
            _count: { service: true }
        });
        const total = services.reduce((sum, s) => sum + s._count.service, 0);
        return services.map(s => ({
            service: s.service,
            count: s._count.service,
            percentage: total > 0 ? parseFloat(((s._count.service / total) * 100).toFixed(1)) : 0
        }));
    }
    async getDetailedMetrics() {
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const bookings = await this.prisma.booking.findMany({
            where: { status: 'completed' },
            select: { totalAmount: true }
        });
        const avgBookingValue = bookings.length > 0
            ? bookings.reduce((sum, b) => sum + b.totalAmount, 0) / bookings.length
            : 0;
        const avgResponseTime = 18;
        const usersWithMultipleBookings = await this.prisma.user.findMany({
            where: { bookings: { some: {} } },
            include: { _count: { select: { bookings: true } } }
        });
        const retentionRate = usersWithMultipleBookings.length > 0
            ? (usersWithMultipleBookings.filter(u => u._count.bookings > 1).length / usersWithMultipleBookings.length) * 100
            : 0;
        const peakHours = '2-6 PM';
        const peakUsage = 15;
        const currentMonthUsers = await this.prisma.user.count({
            where: { createdAt: { gte: monthStart } }
        });
        const lastMonthUsers = await this.prisma.user.count({
            where: { createdAt: { gte: lastMonthStart, lt: monthStart } }
        });
        const userGrowth = lastMonthUsers > 0
            ? ((currentMonthUsers - lastMonthUsers) / lastMonthUsers) * 100
            : 0;
        const totalBookingsThisWeek = await this.prisma.booking.count({
            where: { createdAt: { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) } }
        });
        const completedBookingsThisWeek = await this.prisma.booking.count({
            where: {
                createdAt: { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) },
                status: 'completed'
            }
        });
        const bookingRate = totalBookingsThisWeek > 0
            ? (completedBookingsThisWeek / totalBookingsThisWeek) * 100
            : 0;
        const workers = await this.prisma.worker.findMany({ select: { rating: true } });
        const avgWorkerRating = workers.length > 0
            ? workers.reduce((sum, w) => sum + w.rating, 0) / workers.length
            : 0;
        return {
            avgBookingValue: Math.round(avgBookingValue),
            avgResponseTime,
            retentionRate: parseFloat(retentionRate.toFixed(0)),
            peakHours,
            peakUsage,
            userGrowth: parseFloat(userGrowth.toFixed(0)),
            bookingRate: parseFloat(bookingRate.toFixed(1)),
            avgWorkerRating: parseFloat(avgWorkerRating.toFixed(1))
        };
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listUsers", null);
__decorate([
    (0, common_1.Get)('workers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listWorkers", null);
__decorate([
    (0, common_1.Get)('dashboard/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)('dashboard/services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTrendingServices", null);
__decorate([
    (0, common_1.Get)('dashboard/bookings/recent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getRecentBookings", null);
__decorate([
    (0, common_1.Get)('dashboard/workers/top'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTopWorkers", null);
__decorate([
    (0, common_1.Get)('bookings/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getBookingsStats", null);
__decorate([
    (0, common_1.Get)('bookings/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllBookings", null);
__decorate([
    (0, common_1.Get)('users/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUsersStats", null);
__decorate([
    (0, common_1.Get)('workers/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getWorkersStats", null);
__decorate([
    (0, common_1.Get)('analytics/revenue'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getRevenueAnalytics", null);
__decorate([
    (0, common_1.Get)('analytics/services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getServiceDistribution", null);
__decorate([
    (0, common_1.Get)('analytics/metrics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDetailedMetrics", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map
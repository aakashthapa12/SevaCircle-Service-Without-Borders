import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('users')
  async listUsers() {
    return this.prisma.user.findMany({ select: { id: true, email: true, name: true, phone: true, createdAt: true } });
  }

  @Get('workers')
  async listWorkers() {
    return this.prisma.worker.findMany({ select: { id: true, email: true, name: true, phone: true, service: true, createdAt: true } });
  }

  @Get('dashboard/stats')
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

  @Get('dashboard/services')
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

  @Get('dashboard/bookings/recent')
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

  @Get('dashboard/workers/top')
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

  @Get('bookings/stats')
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

  @Get('bookings/all')
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

  @Get('users/stats')
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

    // Calculate average user satisfaction based on worker ratings from completed bookings
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

  @Get('workers/stats')
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

  @Get('analytics/revenue')
  async getRevenueAnalytics() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Get revenue for last 12 months
    const monthlyRevenue: { month: string; revenue: number }[] = [];
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

  @Get('analytics/services')
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

  @Get('analytics/metrics')
  async getDetailedMetrics() {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Average booking value
    const bookings = await this.prisma.booking.findMany({
      where: { status: 'completed' },
      select: { totalAmount: true }
    });
    const avgBookingValue = bookings.length > 0 
      ? bookings.reduce((sum, b) => sum + b.totalAmount, 0) / bookings.length 
      : 0;

    // Worker response time (mock for now, would need actual timestamps)
    const avgResponseTime = 18;

    // Customer retention (users with multiple bookings)
    const usersWithMultipleBookings = await this.prisma.user.findMany({
      where: { bookings: { some: {} } },
      include: { _count: { select: { bookings: true } } }
    });
    const retentionRate = usersWithMultipleBookings.length > 0
      ? (usersWithMultipleBookings.filter(u => u._count.bookings > 1).length / usersWithMultipleBookings.length) * 100
      : 0;

    // Peak hours (mock data for now)
    const peakHours = '2-6 PM';
    const peakUsage = 15;

    // User growth
    const currentMonthUsers = await this.prisma.user.count({
      where: { createdAt: { gte: monthStart } }
    });
    const lastMonthUsers = await this.prisma.user.count({
      where: { createdAt: { gte: lastMonthStart, lt: monthStart } }
    });
    const userGrowth = lastMonthUsers > 0 
      ? ((currentMonthUsers - lastMonthUsers) / lastMonthUsers) * 100 
      : 0;

    // Booking success rate
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

    // Worker rating
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
}

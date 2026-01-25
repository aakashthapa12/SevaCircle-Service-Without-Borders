import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(email: string, password: string, name?: string, phone?: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new BadRequestException('Email already registered');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, passwordHash, name: name || null, phone: phone || null },
    });
    return { id: user.id, email: user.email, name: user.name };
  }

  async createWorker(email: string, password: string, name?: string, phone?: string) {
    const existing = await this.prisma.worker.findUnique({ where: { email } });
    if (existing) throw new BadRequestException('Email already registered');

    const passwordHash = await bcrypt.hash(password, 10);
    const worker = await this.prisma.worker.create({
      data: { email, passwordHash, name: name || null, phone: phone || null },
    });
    return { id: worker.id, email: worker.email, name: worker.name };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    const worker = !user ? await this.prisma.worker.findUnique({ where: { email } }) : null;

    const principal = user || worker;
    const role = user ? 'user' : worker ? 'worker' : null;
    if (!principal || !role) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, principal.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: principal.id, email: principal.email, role };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, user: { id: principal.id, email: principal.email, role } };
  }

  async getProfileFromToken(token: string) {
    if (!token) throw new UnauthorizedException('Missing token');
    let decoded: { sub: string; email: string; role: 'user' | 'worker' | 'admin' };
    try {
      decoded = await this.jwtService.verifyAsync(token);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }

    if (decoded.role === 'user') {
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.sub },
        select: { 
          id: true, 
          email: true, 
          name: true, 
          phone: true,
          street: true,
          city: true,
          state: true,
          pincode: true,
          landmark: true,
          totalSavings: true,
          membershipStatus: true,
          favoritesCount: true,
          bookings: {
            select: { id: true }
          }
        },
      });
      if (!user) throw new UnauthorizedException('User not found');
      return { 
        role: 'user', 
        profile: {
          ...user,
          bookingsCount: user.bookings.length
        }
      };
    }

    if (decoded.role === 'worker') {
      const worker = await this.prisma.worker.findUnique({
        where: { id: decoded.sub },
        select: { 
          id: true, 
          email: true, 
          name: true, 
          phone: true, 
          service: true,
          totalEarnings: true,
          completedJobs: true,
          rating: true
        },
      });
      if (!worker) throw new UnauthorizedException('Worker not found');
      return { role: 'worker', profile: worker };
    }

    throw new UnauthorizedException('Unsupported role');
  }

  async updateUserProfile(userId: string, updates: {
    name?: string;
    phone?: string;
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
    landmark?: string;
  }) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updates,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        street: true,
        city: true,
        state: true,
        pincode: true,
        landmark: true,
        totalSavings: true,
        membershipStatus: true,
        favoritesCount: true
      }
    });
    return user;
  }
}

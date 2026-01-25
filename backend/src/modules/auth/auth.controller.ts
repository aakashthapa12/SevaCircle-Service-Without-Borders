import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/user')
  registerUser(@Body() body: { email: string; password: string; name?: string; phone?: string }) {
    return this.authService.createUser(body.email, body.password, body.name, body.phone);
  }

  @Post('register/worker')
  registerWorker(@Body() body: { email: string; password: string; name?: string; phone?: string }) {
    return this.authService.createWorker(body.email, body.password, body.name, body.phone);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Get('profile')
  profile(@Req() req: Request) {
    const authHeader = req.headers['authorization'] || '';
    let token: string | undefined;
    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    } else {
      const headerToken = req.headers['x-auth-token'];
      token = typeof headerToken === 'string' ? headerToken : undefined;
    }
    return this.authService.getProfileFromToken(token || '');
  }

  @Put('profile')
  async updateProfile(@Req() req: Request, @Body() body: {
    name?: string;
    phone?: string;
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
    landmark?: string;
  }) {
    const authHeader = req.headers['authorization'] || '';
    let token: string | undefined;
    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    } else {
      const headerToken = req.headers['x-auth-token'];
      token = typeof headerToken === 'string' ? headerToken : undefined;
    }

    const profile = await this.authService.getProfileFromToken(token || '');
    if (profile.role !== 'user') {
      throw new Error('Only users can update profile');
    }

    return this.authService.updateUserProfile(profile.profile.id, body);
  }
}

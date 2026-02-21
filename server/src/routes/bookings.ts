import { Router, Response } from 'express';
import { z } from 'zod';
import { getDB } from '../database.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = Router();

const bookingSchema = z.object({
  worker_id: z.number(),
  service_id: z.number(),
  date: z.string(),
  time_slot: z.string(),
  address: z.string(),
  notes: z.string().optional(),
  total_amount: z.number()
});

// Create booking (protected)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const data = bookingSchema.parse(req.body);
    const db = getDB();

    const newBooking = {
      id: db.data.bookings.length + 1,
      user_id: req.userId!,
      worker_id: data.worker_id,
      service_id: data.service_id,
      date: data.date,
      time_slot: data.time_slot,
      address: data.address,
      notes: data.notes || '',
      total_amount: data.total_amount,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    db.data.bookings.push(newBooking);
    await db.write();

    res.status(201).json({
      message: 'Booking created successfully',
      booking_id: newBooking.id
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get user bookings (protected)
router.get('/my-bookings', authenticateToken, (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const bookings = db.data.bookings
      .filter(b => b.user_id === req.userId)
      .map(b => {
        const worker = db.data.workers.find(w => w.id === b.worker_id);
        const service = db.data.services.find(s => s.id === b.service_id);
        return {
          ...b,
          worker_name: worker?.name || '',
          worker_phone: worker?.phone || '',
          service_name: service?.name || '',
          service_icon: service?.icon || ''
        };
      })
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get all bookings (admin only)
router.get('/all', authenticateToken, (req: AuthRequest, res: Response) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const db = getDB();
    const bookings = db.data.bookings.map(b => {
      const user = db.data.users.find(u => u.id === b.user_id);
      const worker = db.data.workers.find(w => w.id === b.worker_id);
      const service = db.data.services.find(s => s.id === b.service_id);
      return {
        ...b,
        user_name: user?.name || '',
        user_email: user?.email || '',
        user_phone: user?.phone || '',
        worker_name: worker?.name || '',
        worker_phone: worker?.phone || '',
        service_name: service?.name || '',
        service_icon: service?.icon || ''
      };
    }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Update booking status (admin only)
router.patch('/:id/status', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { status } = req.body;
    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const db = getDB();
    const booking = db.data.bookings.find(b => b.id === Number(req.params.id));
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.status = status;
    await db.write();

    res.json({ message: 'Booking status updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

export default router;

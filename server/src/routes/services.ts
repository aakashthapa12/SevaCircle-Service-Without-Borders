import { Router, Request, Response } from 'express';
import { getDB } from '../database.js';

const router = Router();

// Get all services
router.get('/', (req: Request, res: Response) => {
  try {
    const db = getDB();
    res.json(db.data.services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Get service by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const db = getDB();
    const service = db.data.services.find(s => s.id === Number(req.params.id));
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

export default router;

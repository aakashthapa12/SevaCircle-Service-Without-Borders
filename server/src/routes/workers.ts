import { Router, Request, Response } from 'express';
import { getDB } from '../database.js';

const router = Router();

// Get all workers
router.get('/', (req: Request, res: Response) => {
  try {
    const db = getDB();
    const { service_id } = req.query;
    
    let workers = db.data.workers.map(w => {
      const service = db.data.services.find(s => s.id === w.service_id);
      return {
        ...w,
        service_name: service?.name || '',
        service_icon: service?.icon || ''
      };
    });
    
    if (service_id) {
      workers = workers.filter(w => w.service_id === Number(service_id));
    }
    
    // Sort by rating
    workers.sort((a, b) => b.rating - a.rating);
    
    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workers' });
  }
});

// Get worker by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const db = getDB();
    const worker = db.data.workers.find(w => w.id === Number(req.params.id));
    
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    
    const service = db.data.services.find(s => s.id === worker.service_id);
    
    res.json({
      ...worker,
      service_name: service?.name || '',
      service_icon: service?.icon || '',
      base_price: service?.base_price || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch worker' });
  }
});

export default router;

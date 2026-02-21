import { JSONFilePreset } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database types
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  created_at: string;
}

interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  base_price: number;
  created_at: string;
}

interface Worker {
  id: number;
  name: string;
  email?: string;
  phone: string;
  service_id: number;
  rating: number;
  reviews: number;
  experience: number;
  languages: string;
  verified: number;
  distance: number;
  created_at: string;
}

interface Booking {
  id: number;
  user_id: number;
  worker_id: number;
  service_id: number;
  date: string;
  time_slot: string;
  status: string;
  total_amount: number;
  address: string;
  notes?: string;
  created_at: string;
}

interface Database {
  users: User[];
  services: Service[];
  workers: Worker[];
  bookings: Booking[];
}

// Default data
const defaultData: Database = {
  users: [],
  services: [],
  workers: [],
  bookings: []
};

let db: Awaited<ReturnType<typeof JSONFilePreset<Database>>>;

export async function initDatabase() {
  // Initialize database
  db = await JSONFilePreset<Database>(join(__dirname, '../database.json'), defaultData);

  // Seed data if empty
  if (db.data.services.length === 0) {
    await seedData();
  }

  console.log('✅ Database initialized');
}

async function seedData() {
  const hashedPassword = bcrypt.hashSync('demo123', 10);
  const adminPassword = bcrypt.hashSync('admin123', 10);

  db.data = {
    users: [
      {
        id: 1,
        name: 'Demo User',
        email: 'demo@sevacircle.com',
        phone: '9999999999',
        password: hashedPassword,
        role: 'user',
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Admin',
        email: 'admin@sevacircle.com',
        phone: '8888888888',
        password: adminPassword,
        role: 'admin',
        created_at: new Date().toISOString()
      }
    ],
    services: [
      { id: 1, name: 'Plumber', description: 'Pipe repairs, installations, leaks', icon: '🔧', base_price: 500, created_at: new Date().toISOString() },
      { id: 2, name: 'Electrician', description: 'Wiring, repairs, installations', icon: '⚡', base_price: 600, created_at: new Date().toISOString() },
      { id: 3, name: 'Carpenter', description: 'Furniture repair and installation', icon: '🪚', base_price: 700, created_at: new Date().toISOString() },
      { id: 4, name: 'Painter', description: 'Interior and exterior painting', icon: '🎨', base_price: 800, created_at: new Date().toISOString() },
      { id: 5, name: 'Mechanic', description: 'Vehicle repairs and maintenance', icon: '🔩', base_price: 1000, created_at: new Date().toISOString() },
      { id: 6, name: 'Cleaner', description: 'Home and office cleaning', icon: '🧹', base_price: 400, created_at: new Date().toISOString() }
    ],
    workers: [
      { id: 1, name: 'Rajesh Kumar', phone: '9876543210', service_id: 1, rating: 4.8, reviews: 156, experience: 5, languages: 'English, Hindi, Marathi', verified: 1, distance: 2.5, created_at: new Date().toISOString() },
      { id: 2, name: 'Amit Sharma', phone: '9876543211', service_id: 2, rating: 4.7, reviews: 142, experience: 4, languages: 'English, Hindi', verified: 1, distance: 3.2, created_at: new Date().toISOString() },
      { id: 3, name: 'Sunil Patil', phone: '9876543212', service_id: 3, rating: 4.9, reviews: 189, experience: 7, languages: 'English, Hindi, Marathi', verified: 1, distance: 1.8, created_at: new Date().toISOString() },
      { id: 4, name: 'Vijay Singh', phone: '9876543213', service_id: 4, rating: 4.6, reviews: 98, experience: 3, languages: 'English, Hindi', verified: 1, distance: 4.5, created_at: new Date().toISOString() },
      { id: 5, name: 'Ravi Verma', phone: '9876543214', service_id: 5, rating: 4.8, reviews: 167, experience: 6, languages: 'English, Hindi', verified: 1, distance: 2.1, created_at: new Date().toISOString() },
      { id: 6, name: 'Prakash Joshi', phone: '9876543215', service_id: 6, rating: 4.7, reviews: 124, experience: 4, languages: 'English, Hindi, Marathi', verified: 1, distance: 3.7, created_at: new Date().toISOString() },
      { id: 7, name: 'Deepak Yadav', phone: '9876543216', service_id: 1, rating: 4.5, reviews: 87, experience: 2, languages: 'English, Hindi', verified: 1, distance: 5.2, created_at: new Date().toISOString() },
      { id: 8, name: 'Sandeep Gupta', phone: '9876543217', service_id: 2, rating: 4.9, reviews: 201, experience: 8, languages: 'English, Hindi', verified: 1, distance: 1.5, created_at: new Date().toISOString() }
    ],
    bookings: []
  };

  await db.write();
  console.log('✅ Database seeded with demo data');
}

export function getDB() {
  return db;
}

export default db;

export interface Worker {
  id: string;
  name: string;
  service: string;
  rating: number;
  reviews: number;
  price: number;
  languages: string[];
  image: string;
  experience: number;
  verified: boolean;
  description: string;
  distance: string;
  availability: string;
}

export const workers: Worker[] = [];

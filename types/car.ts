export interface CarType {
  id: number;
  name: string;
  brand: string;
  type: string;
  price: number;
  image: string;
  capacity: number;
  transmission: string[];
  fuelType: string;
  year: number;
  isShowing: boolean;
  shortDescription: string;
  description: string;
  features: string[];
  color?: string;
  created_at?: string;
  updated_at?: string;
}

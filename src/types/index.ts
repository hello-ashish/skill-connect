export type UserRole = 'user' | 'worker';

export interface Worker {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: number;
  pricePerHour: number;
  location: string;
  rating: number;
  reviewCount: number;
  availability: boolean;
  profileImage: string;
  bio: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  favorites: string[];
  createdAt: string;
}

export const SKILL_OPTIONS = [
  'Electrician', 'Plumber', 'Carpenter', 'Painter', 'Mechanic',
  'Tutor', 'Designer', 'Photographer', 'Chef', 'Driver',
  'Cleaner', 'Gardener', 'AC Repair', 'Mason', 'Welder',
  'Tailor', 'Barber', 'Yoga Trainer', 'Music Teacher', 'Web Developer',
];

export const LOCATION_OPTIONS = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Chandigarh', 'Indore', 'Bhopal', 'Patna', 'Nagpur',
];

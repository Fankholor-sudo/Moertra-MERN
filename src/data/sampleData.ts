import { Artisan, Category, Job } from '../types'

export const CATEGORIES: Category[] = [
  'Construction',
  'Electrical',
  'Automotive',
  'Fabrication',
  'Plumbing',
  'Painting',
]

export const NEARBY_ARTISANS: Artisan[] = [
  { name: 'Samuel Johnson', rating: 4.9, distanceKm: 2.1 },
  { name: 'Chika Okafor', rating: 4.9, distanceKm: 2.1 },
]

export const MY_JOBS: Job[] = [
  { title: 'Bathroom plumbing', status: 'In progress · Samuel Johnson', price: 'R240' },
  { title: 'Paint 2-bedroom flat', status: 'Completed · Meortra verified', price: 'R560' },
  { title: 'AC maintenance', status: 'Completed · Meortra verified', price: 'R560' },
]

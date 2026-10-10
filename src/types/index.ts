export type Tab = 'Home' | 'Services' | 'Activity' | 'Account'

export type Category =
  'Construction' | 'Electrical' | 'Automotive' | 'Fabrication' | 'Plumbing' | 'Painting'

export type Artisan = {
  name: string
  rating: number
  distanceKm: number
}

export type Job = {
  title: string
  status: string
  price: string
}

export type JobDetails = {
  work: string
  description: string
  specifics: string
}

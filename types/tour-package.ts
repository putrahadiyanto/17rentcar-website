export interface TourPackageType {
  id: string
  name: string
  shortDescription: string
  description: string
  image: string
  price: number
  duration: string
  minPeople: number
  destinations: string[]
  itinerary: {
    activities: {
      time: string
      title: string
      description: string
    }[]
  }[]
  includes: string[]
  excludes: string[]
}

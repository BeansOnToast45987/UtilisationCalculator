import type { Country } from './country.types'

export interface User {
  id: string
  firstName: string
  lastName: string
  name: string
  clerkId: string
  country: Country
}

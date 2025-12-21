import type { Country } from '../shared/country.types'
import { User } from '../shared/user.types'

export interface InitializeUserInput {
  clerkId: string
  firstName: string
  lastName: string
  name: string
  country: Country
}

export interface InitializeUserResponse {
  user: User
  created: boolean
  message: string
}

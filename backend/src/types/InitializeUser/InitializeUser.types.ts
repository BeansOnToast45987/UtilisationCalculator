import { User } from '../shared/user.types'

export interface InitializeUserResponse {
  user: User
  created: boolean
  message: string
}

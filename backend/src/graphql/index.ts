import { InitializeUserResolver } from './InitializeUser/resolver/InitializeUser.resolver'
import { InitializeUserTypeDefs } from './InitializeUser/schema/InitializeUser.schema'

export const AllResolvers = [
  InitializeUserResolver,
]

export const AllTypeDefs = [
  InitializeUserTypeDefs,
]

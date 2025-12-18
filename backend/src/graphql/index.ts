import { InitializeUserResolver } from './InitializeUser/resolver/InitializeUser.resolver'
import { InitializeUserTypeDefs } from './InitializeUser/schema/InitializeUser.schema'
import { CalculateUtilisationResolver } from './CalculateUtilisation/resolver/CalculateUtilisation.resolver'
import { CalculateUtilisationTypeDefs } from './CalculateUtilisation/schema/CalculateUtilisation.schema'

export const AllResolvers = [
  InitializeUserResolver,
  CalculateUtilisationResolver,
]

export const AllTypeDefs = [
  InitializeUserTypeDefs,
  CalculateUtilisationTypeDefs,
]

import { InitializeUserResolver } from './InitializeUser/resolver/InitializeUser.resolver'
import { InitializeUserTypeDefs } from './InitializeUser/schema/InitializeUser.schema'
import { CalculateUtilisationResolver } from './CalculateUtilisation/resolver/CalculateUtilisation.resolver'
import { CalculateUtilisationTypeDefs } from './CalculateUtilisation/schema/CalculateUtilisation.schema'
import { GetUtilisationResolver } from './GetUtilisation/resolver/GetUtilisation.resolver'
import { GetUtilisationTypeDefs } from './GetUtilisation/schema/GetUtilisation.schema'
import { DeleteUtilisationResolver } from './DeleteUtilisation/resolver/DeleteUtilisation.resolver'
import { DeleteUtilisationTypeDefs } from './DeleteUtilisation/schema/DeleteUtilisation.schema'

export const AllResolvers = [
  InitializeUserResolver,
  CalculateUtilisationResolver,
  GetUtilisationResolver,
  DeleteUtilisationResolver,
]

export const AllTypeDefs = [
  InitializeUserTypeDefs,
  CalculateUtilisationTypeDefs,
  GetUtilisationTypeDefs,
  DeleteUtilisationTypeDefs,
]

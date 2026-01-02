import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { AllResolvers } from "./graphql/index";
import { AllTypeDefs } from "./graphql/index";

const resolvers = mergeResolvers(AllResolvers);
const typeDefs = mergeTypeDefs(AllTypeDefs);

export { typeDefs, resolvers };

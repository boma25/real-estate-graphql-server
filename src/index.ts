/** @format */

import startServer from "./app"
import typeDefs from "./graphql/typeDefs/index"
import resolvers from "./graphql/resolvers/index"

console.log(typeDefs)
startServer(typeDefs, resolvers)

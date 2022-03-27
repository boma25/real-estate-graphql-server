/** @format */

import * as express from "express"
import "dotenv/config"
import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"

async function startServer(typeDefs: any, resolvers: any) {
	//initializing the express app
	const app = express()

	//initialize graphql server
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req }) => ({
			req,
			authorization: req.headers.authorization,
		}),
	})
	await server.start()

	server.applyMiddleware({ app })

	//port initialization
	const PORT = process.env.PORT || 5001

	//listen on port
	app.listen(PORT, () =>
		console.log(
			`🚀 Server runnin on port ${PORT} and graphql url is ${server.graphqlPath}`
		)
	)
}

export default startServer

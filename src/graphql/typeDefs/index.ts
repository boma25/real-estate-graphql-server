/** @format */

import { gql } from "apollo-server-express"

const typeDefs = gql`
	type Query {
		getUser(id: ID): User!
		getAllUsers: [User!]!
		login(email: String!, password: String!): Login
	}

	type User {
		id: ID
		first_name: String!
		last_name: String!
		email: String!
		created_at: Date
		updated_at: Date
	}

	type Login {
		user: User!
		accessToken: String!
	}

	type Mutation {
		signUp(
			first_name: String!
			last_name: String!
			email: String!
			password: String!
		): User
	}

	scalar Date
`

export default typeDefs

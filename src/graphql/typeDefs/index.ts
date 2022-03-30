/** @format */

import { gql } from "apollo-server-express"

const typeDefs = gql`
	type Query {
		getUser(id: ID): User
		getAllUsers: [User!]
		login(email: String!, password: String!): Login
		getAllListings: [Listings!]
		getListingById(id: ID!): Listings
		getUsersListings: [Listings]
	}

	type User {
		id: ID
		first_name: String!
		last_name: String!
		email: String!
		user_type: UserType
		address: String
		listings: [Listings]
		likes: Int
		comments: [Comments]
		created_at: Date
		updated_at: Date
	}

	type Listings {
		id: ID
		lister: User
		location: String
		is_sold: Boolean
		listing_image: String
		likes: Int
		comments: [Comments]
		description: String
		created_at: Date
		updated_at: Date
	}

	type Comments {
		id: ID
		user: User
		listing: Listings
		comment: String
		created_at: Date
		updated_at: Date
	}

	type Login {
		user: User!
		accessToken: String!
	}

	type Like {
		id: ID
		user: User
		listing: Listings
		created_at: Date
		updated_at: Date
	}

	enum UserType {
		user
		lister
	}

	type Mutation {
		signUp(
			first_name: String!
			last_name: String!
			email: String!
			password: String!
			address: String!
			user_type: UserType
		): User

		createListing(description: String!, location: String!): Listings

		updateListing(
			id: ID!
			description: String
			location: String
			is_sold: Boolean
		): Listings

		likeListing(listing: ID!): Like

		unLikeListing(listing: ID!): Like

		createComment(comment: String, listing: ID): Comments
		deleteComment(id: ID): Comments
	}

	scalar Date
`

export default typeDefs

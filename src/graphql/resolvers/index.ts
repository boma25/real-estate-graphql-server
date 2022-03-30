/** @format */

import { authService } from "../../api/auth/auth.service"
import { userService } from "../../api/user/user.service"
import { authHelper } from "../../helpers/auth.helper"
import { commentResolvers } from "./comments.resolvers"
import { likesResolvers } from "./likes.resolvers"
import { listingsResolvers } from "./listings.resolvers"
import { typeResolvers } from "./types.resolvers"

const resolvers = {
	...typeResolvers,
	Query: {
		getUser: async (parent: any, args: any, { authorization }: any) => {
			const user = authHelper.verifyToken(authorization)
			return await userService.findUserById(args.id || user)
		},

		getAllUsers: async () => await userService.getAllUsers(),

		login: async (parents: any, args: any) =>
			await authService.login(args.email, args.password),

		...listingsResolvers.query,
	},

	Mutation: {
		signUp: async (parent: any, args: any) => await authService.signUp(args),
		...listingsResolvers.mutations,
		...likesResolvers.mutations,
		...commentResolvers.mutations,
	},
}

export default resolvers

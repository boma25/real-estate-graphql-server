/** @format */

import { authService } from "../../api/auth/auth.service"
import { userService } from "../../api/user/user.service"
import { authHelper } from "../../helpers/auth.helper"
import { dateScalar } from "../typeDefs/customTypes"

const resolvers = {
	Date: dateScalar,
	Query: {
		getUser: async (parent: any, args: any, { authorization }: any) => {
			const user = authHelper.verifyToken(authorization)
			return await userService.findUserById(args.id || user)
		},

		getAllUsers: async () => await userService.getAllUsers(),

		login: async (parents: any, args: any) =>
			await authService.login(args.email, args.password),
	},

	Mutation: {
		signUp: async (parent: any, args: any) => await authService.signUp(args),
	},
}

export default resolvers

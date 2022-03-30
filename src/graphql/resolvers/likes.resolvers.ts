/** @format */

import { authHelper } from "../../helpers/auth.helper"
import { likesService } from "../../api/likes/likes.service"

export const likesResolvers = {
	query: {},
	mutations: {
		likeListing: async (parent: any, args: any, { authorization }: any) => {
			const user = authHelper.verifyToken(authorization)

			return await likesService.likeListing(args.listing, user)
		},

		unLikeListing: async (parent: any, args: any, { authorization }: any) => {
			const user = authHelper.verifyToken(authorization)

			return await likesService.unLikeListing(args.listing, user)
		},
	},
}

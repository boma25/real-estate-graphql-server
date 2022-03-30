/** @format */

import { authHelper } from "../../helpers/auth.helper"
import { listingsService } from "../../api/listings/listings.service"
import { userService } from "../../api/user/user.service"

export const listingsResolvers = {
	query: {
		getUsersListings: async (
			parent: any,
			args: any,
			{ authorization }: any
		) => {
			const user = await userService.findUserById(
				authHelper.verifyToken(authorization)
			)
			if (user.user_type !== "lister") {
				throw new Error("you dont have access to the functionality")
			}
			return await listingsService.getAllUserListings(user.id)
		},

		getListingById: async (parents: any, args: any, { authorization }: any) => {
			authHelper.verifyToken(authorization)
			return await listingsService.getListingById(args.id)
		},

		getAllListings: async (parents: any, args: any, { authorization }: any) => {
			authHelper.verifyToken(authorization)
			return await listingsService.getAllListings()
		},
	},
	mutations: {
		createListing: async (parent: any, args: any, { authorization }: any) => {
			const user = await userService.findUserById(
				authHelper.verifyToken(authorization)
			)
			if (user.user_type !== "lister") {
				throw new Error("you dont have access to the functionality")
			}
			args.lister = user.id
			return await listingsService.createListing(args)
		},

		updateListing: async (parent: any, args: any, { authorization }: any) => {
			const user = await userService.findUserById(
				authHelper.verifyToken(authorization)
			)
			if (user.user_type !== "lister") {
				throw new Error("you dont have access to the functionality")
			}
			const { id, ...data } = args
			return await listingsService.updateListing(id, data)
		},
	},
}

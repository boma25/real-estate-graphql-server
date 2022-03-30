/** @format */

import { commentsService } from "../../api/comments/comments.service"
import { authHelper } from "../../helpers/auth.helper"

export const commentResolvers = {
	query: {},
	mutations: {
		createComment: async (parent: any, args: any, { authorization }) => {
			const user = authHelper.verifyToken(authorization)
			return await commentsService.createComment({ ...args, user })
		},
		deleteComment: async (parent: any, args: any, { authorization }) => {
			const user = authHelper.verifyToken(authorization)
			return await commentsService.createComment({ ...args, user })
		},
	},
}

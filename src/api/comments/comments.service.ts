/** @format */

import { BaseService } from "../../helpers/db.helper"
import { Comments } from "./comments.model"

interface CommentsInterface {
	user: number
	listing: number
	comment: string
}

class CommentsService extends BaseService {
	public async createComment(data: CommentsInterface) {
		try {
			return await this.create(Comments, data)
		} catch (err) {
			throw err
		}
	}
	public async deleteComment(id: number, user: number) {
		try {
			const comment = await this.findCommentById(id)
			if (comment.user !== user) {
				throw new Error("this comment doesn't belong to this user")
			}
			return await this.deleteById(Comments, id)
		} catch (err) {
			throw err
		}
	}

	public async findCommentById(id: number) {
		try {
			const comment = await this.findById(Comments, id)
			if (!comment) {
				throw new Error("invalid comment id")
			}
			return comment
		} catch (err) {
			throw err
		}
	}
}

export const commentsService = new CommentsService()

/** @format */

import { BaseService } from "../../helpers/db.helper"
import { Likes } from "../likes/likes.model"
import { listingsService } from "../listings/listings.service"

interface Like {
	id?: any
	listing: any
	user: any
}
class LikesService extends BaseService {
	public async likeListing(listing: number, user: number) {
		try {
			const like: Like = await this.checkForLike(listing, user)
			if (like) {
				throw new Error("Listing has already been liked by you")
			}

			return await this.create(Likes, { listing, user })
		} catch (err) {
			throw err
		}
	}

	public async unLikeListing(listing: number, user: number) {
		try {
			const like: Like = await this.checkForLike(listing, user)
			if (like) {
				return await this.deleteById(Likes, like.id)
			}

			throw new Error("Listing has not been liked by you")
		} catch (err) {
			throw err
		}
	}

	public async checkForLike(listing?: number, user?: number): Promise<Like> {
		try {
			await listingsService.getListingById(listing)
			return await this.findBy(Likes, {
				listing: { id: listing },
				user: { id: user },
			})
		} catch (err) {
			throw err
		}
	}

	public async countLikes(listing: number) {
		try {
			return (await this.countBy(Likes, { listing: { id: listing } })) || 0
		} catch (err) {
			throw err
		}
	}
}

export const likesService = new LikesService()

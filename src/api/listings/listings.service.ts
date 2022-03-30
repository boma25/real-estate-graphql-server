/** @format */

import { BaseService } from "../../helpers/db.helper"
import { likesService } from "../likes/likes.service"
import { Listings } from "./listings.model"

interface ListingsInterface {
	lister: number
	location: string
	description: string
}

class ListingsService extends BaseService {
	public async getListingById(id: number) {
		try {
			const listing = await this.findById(Listings, id)
			if (!listing) {
				throw new Error("invalid listing id")
			}
			listing.likes = await likesService.countLikes(id)
			return listing
		} catch (err) {
			throw err
		}
	}

	public async getAllListings() {
		try {
			const listings = await this.findAll(Listings)

			for (const i in listings) {
				listings[i].likes = await likesService.countLikes(listings[i].id)
			}
			return listings
		} catch (err) {
			throw err
		}
	}

	public async getAllUserListings(lister: number) {
		try {
			const listings = await this.findAllBy(Listings, { lister })
			for (const i in listings) {
				listings[i].likes = await likesService.countLikes(listings[i].id)
			}
			return listings
		} catch (err) {
			throw err
		}
	}

	public async createListing(data: ListingsInterface) {
		try {
			const { location } = data
			if (await this.findBy(Listings, { location })) {
				throw new Error(
					"you can not list a location that has already been listed"
				)
			}

			return await this.create(Listings, data)
		} catch (err) {
			throw err
		}
	}

	public async updateListing(id: number, data: Listings) {
		try {
			await this.getListingById(id)
			await this.findByIdAndUpdate(Listings, id, data)

			return await this.getListingById(id)
		} catch (err) {
			throw err
		}
	}
}

export const listingsService = new ListingsService()

/** @format */

import { Entity, ManyToOne } from "typeorm"
import { BaseEntity } from "../../utils/base.entity"
import { Listings } from "../listings/listings.model"
import { User } from "../user/user.model"

@Entity()
export class Likes extends BaseEntity {
	@ManyToOne(() => Listings, (listings) => listings.likes)
	listing: Listings

	@ManyToOne(() => User, (user) => user.likes)
	user: User
}

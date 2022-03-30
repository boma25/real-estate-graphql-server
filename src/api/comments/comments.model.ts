/** @format */

import { Entity, Column, ManyToOne } from "typeorm"
import { User } from "../user/user.model"
import { Listings } from "../listings/listings.model"
import { BaseEntity } from "../../utils/base.entity"

@Entity()
export class Comments extends BaseEntity {
	@ManyToOne(() => Listings, (listings) => listings.comments)
	listing: Listings

	@ManyToOne(() => User, (user) => user.comments)
	user: User

	@Column()
	comment: string
}

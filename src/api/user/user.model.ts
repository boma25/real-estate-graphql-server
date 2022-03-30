/** @format */

import { Entity, Column, OneToMany } from "typeorm"
import { BaseEntity } from "../../utils/base.entity"
import { UserType } from "../../utils/Enums"
import { Comments } from "../comments/comments.model"
import { Likes } from "../likes/likes.model"
import { Listings } from "../listings/listings.model"

@Entity({ name: "users" })
export class User extends BaseEntity {
	@Column()
	first_name: string

	@Column()
	last_name: string

	@Column({ unique: true })
	email: string

	@Column()
	password: string

	@Column({ type: "enum", default: UserType.USER, enum: UserType })
	user_type: string

	@Column()
	address: string

	@OneToMany(() => Listings, (listings) => listings.lister, { eager: true })
	listings: Listings[]

	@OneToMany(() => Likes, (likes) => likes.user)
	likes: Likes[]

	@OneToMany(() => Comments, (comments) => comments.user, { eager: true })
	comments: Comments[]
}

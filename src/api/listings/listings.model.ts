/** @format */

import { Entity, Column, ManyToOne, OneToMany } from "typeorm"
import { BaseEntity } from "../../utils/base.entity"
import { Comments } from "../comments/comments.model"
import { Likes } from "../likes/likes.model"
import { User } from "../user/user.model"

@Entity()
export class Listings extends BaseEntity {
	@ManyToOne(() => User, (user) => user.listings)
	lister: User

	@Column()
	description: string

	@Column({ unique: true })
	location: string

	@Column({ default: false })
	is_sold: boolean

	@Column({ nullable: true })
	listing_image: string

	@OneToMany(() => Likes, (likes) => likes.listing, { eager: true })
	likes: Likes[]

	@OneToMany(() => Comments, (comments) => comments.listing, { eager: true })
	comments: Comments[]
}

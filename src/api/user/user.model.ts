/** @format */

import { Entity, Column } from "typeorm"
import { BaseEntity } from "../../utils/base.entity"

@Entity()
export class User extends BaseEntity {
	@Column()
	first_name: string

	@Column()
	last_name: string

	@Column({ unique: true })
	email: string

	@Column()
	password: string
}

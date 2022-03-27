/** @format */

import { BaseService } from "../../helpers/db.helper"
import { User } from "./user.model"

export interface UserInterface {
	first_name: string
	last_name: string
	email: string
	password: string
}

class UserService extends BaseService {
	public async createNewUser(user: UserInterface) {
		try {
			return await this.create(User, user)
		} catch (err) {
			throw new Error(err.message || "Unable to create user")
		}
	}

	public async getAllUsers() {
		try {
			return await this.findAll(User)
		} catch (err) {
			throw new Error(err.message || "Unable to fetch users")
		}
	}

	public async findUserById(id: number) {
		try {
			return await this.findById(User, id)
		} catch (err) {
			throw new Error(err.message || "Unable to fetchuser")
		}
	}

	public async findUserByEmail(email: string) {
		try {
			const user = await this.findBy(User, { email })
			return user
		} catch (err) {
			throw err
		}
	}
}

export const userService = new UserService()

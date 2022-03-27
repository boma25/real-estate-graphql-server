/** @format */

import { BaseService } from "../../helpers/db.helper"
import { authHelper } from "../../helpers/auth.helper"
import { userService, UserInterface } from "../user/user.service"

class AuthService extends BaseService {
	public async signUp(user: UserInterface) {
		try {
			if (await userService.findUserByEmail(user.email)) {
				throw new Error("a user with this email address already exists")
			}
			user.password = await authHelper.securePassword(user.password)
			return await userService.createNewUser(user)
		} catch (err) {
			throw err
		}
	}

	public async login(email: string, password: string) {
		try {
			const user = await userService.findUserByEmail(email)
			if (!user) {
				throw new Error("invalid email address")
			}
			if (!(await authHelper.validatePassword(password, user.password))) {
				throw new Error("password incorrect")
			}

			const accessToken = authHelper.generateToken(user.id)

			return { user, accessToken }
		} catch (err) {
			throw err
		}
	}
}

export const authService = new AuthService()

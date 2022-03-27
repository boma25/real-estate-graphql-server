/** @format */

import * as bcrypt from "bcrypt"
import * as jsonwebtoken from "jsonwebtoken"

class AuthHelper {
	JWT_SECRET = process.env.JWT_SECRET
	JWT_EXPIRES = process.env.JWT_EXPIRES

	public async securePassword(password: string) {
		const salt = await bcrypt.genSalt(10)
		return await bcrypt.hash(password, salt)
	}

	public async validatePassword(password: string, hash: string) {
		return await bcrypt.compare(password, hash)
	}

	public generateToken(userId: number) {
		try {
			return jsonwebtoken.sign({ data: userId.toString() }, this.JWT_SECRET, {
				expiresIn: this.JWT_EXPIRES,
			})
		} catch (err) {
			throw err
		}
	}

	public verifyToken(token: string) {
		try {
			const data: any = jsonwebtoken.verify(token, this.JWT_SECRET)
			return data.data
		} catch (err) {
			console.log(err)
			throw err
		}
	}
}

export const authHelper = new AuthHelper()

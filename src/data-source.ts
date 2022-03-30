/** @format */

import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	port: 5432,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME || "test",
	synchronize: true,
	logging: true,
	entities: ["**/**.model.ts"],
	migrations: ["migration/**.ts"],
	subscribers: [],
	migrationsRun: true,
})

//database connection
const ConnectionInstance = AppDataSource.initialize()
	.then((connectionInstance) => {
		console.log("data base connection established")
		return connectionInstance
	})
	.catch((err) => console.log(err))

export default ConnectionInstance

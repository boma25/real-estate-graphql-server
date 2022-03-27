/** @format */

import { DeepPartial, EntityTarget } from "typeorm"
import ConnectionInstance from "../data-source"

export class BaseService {
	manager: any

	constructor() {
		this.init()
	}
	private async init() {
		const AppDataSource: any = await ConnectionInstance
		this.manager = AppDataSource.manager
	}

	public async findAll<T>(entity: EntityTarget<T>): Promise<T[]> {
		return await this.manager.find(entity)
	}

	public async findById(entity: EntityTarget<any>, id: number): Promise<any> {
		return await this.manager.findOneBy(entity, { id })
	}

	public async create<T>(
		entity: EntityTarget<T>,
		params: DeepPartial<T>
	): Promise<T> {
		const newEntity = this.manager.create(entity, params)
		return await this.manager.save(newEntity)
	}

	public async findBy(entity: EntityTarget<any>, param: any): Promise<any> {
		return await this.manager.findOne(entity, { where: param })
	}

	public async findAllBy(entity: EntityTarget<any>, param: any): Promise<any> {
		return await this.manager.findBy(entity, param)
	}
}

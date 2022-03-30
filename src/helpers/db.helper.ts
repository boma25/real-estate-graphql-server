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

	public async findAll<T>(entity: EntityTarget<T>, params?: any): Promise<T[]> {
		return await this.manager.find(entity, params)
	}

	public async findById(entity: EntityTarget<any>, id: number): Promise<any> {
		return await this.manager.findOneBy(entity, { id })
	}

	public async create<T>(
		entity: EntityTarget<T>,
		params: DeepPartial<T | any>
	): Promise<T> {
		const newEntity = this.manager.create(entity, params)
		return await this.manager.save(newEntity)
	}

	public async findBy(
		entity: EntityTarget<any>,
		param: any,
		relation?: any
	): Promise<any> {
		return await this.manager.findOne(entity, { where: param, relation })
	}

	public async findAllBy(entity: EntityTarget<any>, param: any): Promise<any> {
		return await this.manager.findBy(entity, param)
	}

	public async deleteById(entity: EntityTarget<any>, id: number): Promise<any> {
		return await this.manager.delete(entity, id)
	}

	public async findByIdAndUpdate(
		entity: EntityTarget<any>,
		id: number,
		param: any
	): Promise<any> {
		return await this.manager.update(entity, id, param)
	}

	public async countBy(entity: EntityTarget<any>, params: any) {
		return await this.manager.countBy(entity, params)
	}
}

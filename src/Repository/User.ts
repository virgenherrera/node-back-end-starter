import UserModel from '../Model/user';
import { IfullRepository } from '../Sys/interfaces';
// only for debugging
// import { dd } from '../Sys/Debug';

export default class UserModelRepository implements IfullRepository {
	async GetById({ id = null, scope = 'default' }): Promise<any> {
		return await UserModel.scope( scope ).findById(id);
	}

	async FindOne(params, scope: string = 'default'): Promise<any> {
		return await UserModel.scope( scope ).findOne(params);
	}

	async GetAll({ where = {}, limit = null, offset = null, sort = [], scope = 'default' }): Promise<any> {
		const Wh = {where, limit, offset, order: sort};

		return await UserModel.scope( scope ).findAndCountAll(Wh);
	}

	async Create(params): Promise<any> {
		return await UserModel.create(params);
	}

	async Update(params): Promise<any> {
		const {
			id = null,
			first_name = null,
			last_name = null,
			email = null,
			password = null,
			role = null,
		} = params;
		const Entity = await UserModel.findById(id);

		if (!Entity) { return `non-existent Entity with id: ${id}`; }

		if (first_name) { Entity.first_name = first_name; }
		if (last_name) { Entity.last_name = last_name; }
		if (email) { Entity.email = email; }
		if (password) { Entity.password = password; }
		if (role) { Entity.role = role; }

		return await Entity.save();
	}

	async Delete(id): Promise<any> {
		const Wh = {
			where: {id}
		};
		return await UserModel.destroy(Wh);
	}
}

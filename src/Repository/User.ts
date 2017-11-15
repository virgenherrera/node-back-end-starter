import {UserModel} from "../Model/user";
import {iRepository} from "../Sys/interfaces";
// only for debugging
// import Debug from "../Sys/Debug";

export class UserRepository extends UserModel implements iRepository{
	async GetOne({ id = null }):Promise<any>{
		return await UserModel
		.findById(id)
		.exec();
	}

	async GetAll({limit,offset,sort={}}): Promise<any> {
		let rows = await UserModel
		.find()
		.skip( offset )
		.limit( limit )
		.sort( sort )
		.exec();

		return {
			count: await UserModel.count({}).exec(),
			rows: rows,
			limit: limit,
			offset: offset,
		};
	}

	async Create(params):Promise<any>{
		let preparedEntity = new UserModel(params);

		return await preparedEntity.save();
	}

	async Update(params):Promise<any>{
		let {
			id				= null,
			email			= null,
			firstName		= null,
			lastName		= null,
			rememberToken	= null,
		} = params;
		let Entity = await UserModel.findById(id).exec();

		if(!Entity) return `non-existent Entity with id: ${id}`;

		if( email )			Entity.email = email;
		if( firstName )		Entity.firstName = firstName;
		if( lastName )		Entity.lastName = lastName;
		if( rememberToken )	Entity.rememberToken = rememberToken;

		return await Entity.save();
	}

	async Delete({id}):Promise<any>{
		return await UserModel.remove({ _id: id }).exec();
	}
}

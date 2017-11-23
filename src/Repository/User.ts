import {UserModel} from "../Model/user";
import {iRepository} from "../Sys/interfaces";
// only for debugging
// import { dd } from "../Sys/Debug";

export default class UserRepository implements iRepository{
	async GetById({ id = null }):Promise<any>{
		return await UserModel.findById(id).exec();
	}

	async FindOne(params,fields=null):Promise<any>{
		return await UserModel.findOne(params,fields).exec();
	}

	async GetAll({limit,offset,sort={}}): Promise<any> {
		// Important to return Total count
		// do not forget to include!!!!
		let count	= await UserModel.count({}).exec();
		let rows	= await UserModel
		.find()
		.skip( offset )
		.limit( limit )
		.sort( sort )
		.exec();

		return {count,rows};
	}

	async Create(params):Promise<any>{
		let preparedEntity	= new UserModel(params);
		let storedEntity	= await preparedEntity.save();

		// to avoid bubble private chars
		return await UserModel.findById(storedEntity).exec();
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
